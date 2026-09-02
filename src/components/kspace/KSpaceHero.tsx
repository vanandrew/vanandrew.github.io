'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FFT2D } from './fft';
import { sheppLogan } from './phantom';

/**
 * The hero instrument: a real 2-D Fourier reconstruction running in the
 * browser. The left panel is k-space (log magnitude); the right panel is the
 * image reconstructed from whichever phase-encode lines have been acquired.
 *
 * Lines are acquired automatically in the selected order, or by dragging
 * across the k-space panel. The fraction of the low-frequency band acquired
 * drives `--name-blur` on <html>, so the page headline comes into focus with
 * the image.
 */

const N = 256;
const HALF = N >> 1;
const AUTOPLAY_MS = 2600;
const START_DELAY_MS = 350;

type Order = 'centric' | 'linear' | 'random';
type Source = 'portrait' | 'phantom';

const ORDERS: Order[] = ['centric', 'linear', 'random'];
const SOURCES: Source[] = ['portrait', 'phantom'];

function buildOrder(kind: Order): Uint16Array {
  const out = new Uint16Array(N);
  if (kind === 'linear') {
    for (let i = 0; i < N; i++) out[i] = i;
  } else if (kind === 'centric') {
    // DC row first, then alternate outward: 128, 129, 127, 130, 126, …
    let i = 0;
    out[i++] = HALF;
    for (let d = 1; d < HALF; d++) {
      out[i++] = HALF + d;
      out[i++] = HALF - d;
    }
    out[i++] = 0;
  } else {
    for (let i = 0; i < N; i++) out[i] = i;
    // Fisher–Yates with a fixed seed so replay looks the same each time.
    let seed = 0x9e3779b9;
    for (let i = N - 1; i > 0; i--) {
      seed ^= seed << 13;
      seed ^= seed >>> 17;
      seed ^= seed << 5;
      const j = (seed >>> 0) % (i + 1);
      const t = out[i];
      out[i] = out[j];
      out[j] = t;
    }
  }
  return out;
}

function parseAccent(): [number, number, number] {
  if (typeof window === 'undefined') return [224, 71, 43];
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const m = /^#([0-9a-f]{6})$/i.exec(raw);
  if (!m) return [224, 71, 43];
  const v = parseInt(m[1], 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

/** Draw an <img> to n×n greyscale floats in [0,1], centre-cropped, contrast-stretched. */
function imageToGrey(img: HTMLImageElement, n: number): Float32Array | null {
  const c = document.createElement('canvas');
  c.width = n;
  c.height = n;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  const s = Math.min(img.naturalWidth, img.naturalHeight);
  const sx = (img.naturalWidth - s) / 2;
  const sy = (img.naturalHeight - s) / 2;
  ctx.drawImage(img, sx, sy, s, s, 0, 0, n, n);
  const { data } = ctx.getImageData(0, 0, n, n);
  const out = new Float32Array(n * n);
  for (let i = 0; i < n * n; i++) {
    out[i] = (0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]) / 255;
  }
  // Percentile stretch (1%–99%) so the film has proper blacks and whites.
  const sorted = Float32Array.from(out).sort();
  const lo = sorted[Math.floor(sorted.length * 0.01)];
  const hi = sorted[Math.floor(sorted.length * 0.99)];
  const range = Math.max(1e-6, hi - lo);
  for (let i = 0; i < out.length; i++) out[i] = Math.min(1, Math.max(0, (out[i] - lo) / range));
  return out;
}

export default function KSpaceHero() {
  const kCanvas = useRef<HTMLCanvasElement>(null);
  const iCanvas = useRef<HTMLCanvasElement>(null);
  const countEl = useRef<HTMLElement>(null);
  const dotEl = useRef<HTMLSpanElement>(null);
  const rootEl = useRef<HTMLDivElement>(null);

  const [order, setOrder] = useState<Order>('centric');
  const [source, setSource] = useState<Source>('portrait');
  const [portrait, setPortrait] = useState<Float32Array | null>(null);
  const [phantom] = useState<Float32Array | null>(() =>
    typeof window === 'undefined' ? null : sheppLogan(N)
  );

  // Everything the animation loop touches lives in one mutable bag so the
  // rAF callback never closes over stale React state.
  const S = useRef({
    fft: null as FFT2D | null,
    kRe: new Float32Array(N * N), // forward FFT, natural order
    kIm: new Float32Array(N * N),
    kLog: new Float32Array(N * N), // log-magnitude for display, shifted order
    wRe: new Float32Array(N * N), // scratch for the inverse
    wIm: new Float32Array(N * N),
    mask: new Uint8Array(N), // acquired?  indexed by shifted row
    heat: new Float32Array(N), // recent-acquisition glow per shifted row
    order: buildOrder('centric'),
    progress: 0,
    playing: false,
    startAt: 0,
    lastT: 0,
    hover: -1,
    painting: false,
    lastPaintRow: -1,
    maskDirty: true,
    drawDirty: true,
    visible: true,
    reduced: false,
    accent: [224, 71, 43] as [number, number, number],
    kImg: null as ImageData | null,
    iImg: null as ImageData | null,
    raf: 0,
    ready: false,
  });

  /* ---------------------------------------------------------------- */
  /* Load the portrait once                                            */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      if (cancelled) return;
      const g = imageToGrey(img, N);
      if (g) setPortrait(g);
      else setSource('phantom');
    };
    img.onerror = () => {
      if (!cancelled) setSource('phantom');
    };
    img.src = '/images/profile.jpeg';
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /* Rendering                                                         */
  /* ---------------------------------------------------------------- */
  const reconstruct = useCallback(() => {
    const s = S.current;
    if (!s.fft) return;
    const { kRe, kIm, wRe, wIm, mask } = s;
    for (let rs = 0; rs < N; rs++) {
      const r = (rs + HALF) & (N - 1); // shifted → natural row
      const off = r * N;
      if (mask[rs]) {
        wRe.set(kRe.subarray(off, off + N), off);
        wIm.set(kIm.subarray(off, off + N), off);
      } else {
        wRe.fill(0, off, off + N);
        wIm.fill(0, off, off + N);
      }
    }
    s.fft.fft2(wRe, wIm, true);

    const img = s.iImg;
    if (!img) return;
    const px = img.data;
    for (let i = 0; i < N * N; i++) {
      const m = Math.hypot(wRe[i], wIm[i]);
      const v = m > 1 ? 255 : (m * 255) | 0;
      const o = i * 4;
      px[o] = v;
      px[o + 1] = v;
      px[o + 2] = v;
      px[o + 3] = 255;
    }
  }, []);

  const drawKSpace = useCallback(() => {
    const s = S.current;
    const img = s.kImg;
    if (!img) return;
    const px = img.data;
    const [ar, ag, ab] = s.accent;
    for (let rs = 0; rs < N; rs++) {
      const acquired = s.mask[rs] === 1;
      const h = s.heat[rs];
      const gain = acquired ? 1 : 0.09;
      const rowOff = rs * N;
      for (let x = 0; x < N; x++) {
        const base = s.kLog[rowOff + x];
        const grey = base * gain * 255;
        let r = grey;
        let g = grey;
        let b = grey;
        if (h > 0.01) {
          // Tint recently acquired lines toward the accent, brighter where
          // the line itself carries more signal.
          const t = h * (0.35 + 0.65 * base);
          r = grey + (ar - grey) * t;
          g = grey + (ag - grey) * t;
          b = grey + (ab - grey) * t;
        }
        const o = (rowOff + x) * 4;
        px[o] = r;
        px[o + 1] = g;
        px[o + 2] = b;
        px[o + 3] = 255;
      }
    }
  }, []);

  const paintFrames = useCallback(() => {
    const s = S.current;
    const kc = kCanvas.current;
    const ic = iCanvas.current;
    if (!kc || !ic || !s.kImg || !s.iImg) return;
    const kctx = kc.getContext('2d');
    const ictx = ic.getContext('2d');
    if (!kctx || !ictx) return;

    kctx.putImageData(s.kImg, 0, 0);
    if (s.hover >= 0) {
      const [r, g, b] = s.accent;
      kctx.fillStyle = `rgba(${r},${g},${b},0.9)`;
      kctx.fillRect(0, s.hover, N, 1);
    }
    ictx.putImageData(s.iImg, 0, 0);
  }, []);

  const updateReadout = useCallback(() => {
    const s = S.current;
    let count = 0;
    for (let i = 0; i < N; i++) count += s.mask[i];
    if (countEl.current) countEl.current.textContent = String(count);
    if (dotEl.current) dotEl.current.classList.toggle('is-live', s.playing);

    // Sharpness = size of the contiguous low-frequency band acquired around DC.
    let band = 0;
    while (band < HALF && s.mask[HALF + band] && (band === 0 || s.mask[HALF - band])) band++;
    const sharp = band / HALF;
    const blur = s.reduced ? 0 : 10 * (1 - sharp) * (1 - sharp);
    document.documentElement.style.setProperty('--name-blur', `${blur.toFixed(2)}px`);
  }, []);

  /* ---------------------------------------------------------------- */
  /* Animation loop                                                    */
  /* ---------------------------------------------------------------- */
  const tick = useCallback(
    (t: number) => {
      const s = S.current;
      s.raf = 0;
      if (!s.ready) return;

      const dt = s.lastT ? Math.min(64, t - s.lastT) : 16;
      s.lastT = t;

      if (s.playing && t >= s.startAt) {
        const rate = N / AUTOPLAY_MS;
        const next = Math.min(N, s.progress + rate * dt);
        for (let i = Math.floor(s.progress); i < Math.floor(next); i++) {
          const rs = s.order[i];
          if (!s.mask[rs]) {
            s.mask[rs] = 1;
            s.maskDirty = true;
          }
          s.heat[rs] = 1;
        }
        s.progress = next;
        if (next >= N) s.playing = false;
        s.drawDirty = true;
      }

      let glowing = false;
      for (let i = 0; i < N; i++) {
        if (s.heat[i] > 0.01) {
          s.heat[i] *= 0.9;
          glowing = true;
          s.drawDirty = true;
        } else if (s.heat[i] !== 0) {
          s.heat[i] = 0;
          s.drawDirty = true;
        }
      }

      if (s.maskDirty) {
        reconstruct();
        updateReadout();
        s.maskDirty = false;
        s.drawDirty = true;
      }
      if (s.drawDirty) {
        drawKSpace();
        paintFrames();
        s.drawDirty = false;
      }

      if ((s.playing || glowing) && s.visible) {
        s.raf = requestAnimationFrame(tick);
      } else {
        s.lastT = 0;
      }
    },
    [drawKSpace, paintFrames, reconstruct, updateReadout]
  );

  const wake = useCallback(() => {
    const s = S.current;
    if (!s.raf && s.ready) s.raf = requestAnimationFrame(tick);
  }, [tick]);

  /* ---------------------------------------------------------------- */
  /* (Re)initialise whenever the source image changes                  */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const s = S.current;
    const grey = source === 'phantom' ? phantom : portrait;
    if (!grey) return;

    if (!s.fft) s.fft = new FFT2D(N);
    s.accent = parseAccent();
    s.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!s.kImg) s.kImg = new ImageData(N, N);
    if (!s.iImg) s.iImg = new ImageData(N, N);

    // Forward transform.
    s.kRe.set(grey);
    s.kIm.fill(0);
    s.fft.fft2(s.kRe, s.kIm, false);

    // Log-magnitude display, fft-shifted so DC sits in the middle.
    let max = 0;
    for (let i = 0; i < N * N; i++) {
      const m = Math.hypot(s.kRe[i], s.kIm[i]);
      if (m > max) max = m;
    }
    const denom = Math.log1p(max);
    for (let r = 0; r < N; r++) {
      const rs = (r + HALF) & (N - 1);
      for (let c = 0; c < N; c++) {
        const cs = (c + HALF) & (N - 1);
        const m = Math.hypot(s.kRe[r * N + c], s.kIm[r * N + c]);
        s.kLog[rs * N + cs] = Math.log1p(m) / denom;
      }
    }

    const firstRun = !s.ready;
    s.ready = true;
    s.heat.fill(0);

    if (firstRun) {
      if (s.reduced) {
        s.mask.fill(1);
        s.progress = N;
        s.playing = false;
      } else {
        s.mask.fill(0);
        s.progress = 0;
        s.playing = true;
        s.startAt = performance.now() + START_DELAY_MS;
      }
    }
    // On a source swap keep the current mask so the comparison is direct.
    s.maskDirty = true;
    s.lastT = 0;
    wake();
  }, [source, portrait, phantom, wake]);

  /* ---------------------------------------------------------------- */
  /* Environment: theme changes, visibility                            */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const s = S.current;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onTheme = () => {
      s.accent = parseAccent();
      s.drawDirty = true;
      wake();
    };
    mq.addEventListener('change', onTheme);

    const io = new IntersectionObserver(
      ([entry]) => {
        s.visible = entry.isIntersecting;
        if (s.visible) wake();
      },
      { threshold: 0.05 }
    );
    if (rootEl.current) io.observe(rootEl.current);

    const onVis = () => {
      s.visible = document.visibilityState === 'visible';
      if (s.visible) wake();
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      mq.removeEventListener('change', onTheme);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      if (s.raf) cancelAnimationFrame(s.raf);
      s.raf = 0;
      document.documentElement.style.removeProperty('--name-blur');
    };
  }, [wake]);

  /* ---------------------------------------------------------------- */
  /* Controls                                                          */
  /* ---------------------------------------------------------------- */
  const replay = useCallback(
    (kind: Order) => {
      const s = S.current;
      s.order = buildOrder(kind);
      s.mask.fill(0);
      s.heat.fill(0);
      s.progress = 0;
      s.playing = true;
      s.startAt = performance.now() + 120;
      s.maskDirty = true;
      s.lastT = 0;
      wake();
    },
    [wake]
  );

  const chooseOrder = (kind: Order) => {
    setOrder(kind);
    replay(kind);
  };

  const clear = () => {
    const s = S.current;
    s.playing = false;
    s.progress = 0;
    s.mask.fill(0);
    s.heat.fill(0);
    s.maskDirty = true;
    wake();
  };

  const fill = () => {
    const s = S.current;
    s.playing = false;
    s.progress = N;
    for (let i = 0; i < N; i++) {
      if (!s.mask[i]) s.heat[i] = 0.6;
      s.mask[i] = 1;
    }
    s.maskDirty = true;
    wake();
  };

  /* ---------------------------------------------------------------- */
  /* Pointer painting on the k-space panel                             */
  /* ---------------------------------------------------------------- */
  const rowFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = ((e.clientY - rect.top) / rect.height) * N;
    return Math.min(N - 1, Math.max(0, Math.floor(y)));
  };

  const paintTo = (row: number) => {
    const s = S.current;
    const from = s.lastPaintRow < 0 ? row : s.lastPaintRow;
    const lo = Math.min(from, row);
    const hi = Math.max(from, row);
    for (let r = lo; r <= hi; r++) {
      if (!s.mask[r]) {
        s.mask[r] = 1;
        s.maskDirty = true;
      }
      s.heat[r] = 1;
    }
    s.lastPaintRow = row;
    s.drawDirty = true;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const s = S.current;
    if (!s.ready) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    s.playing = false;
    s.painting = true;
    s.lastPaintRow = -1;
    paintTo(rowFromEvent(e));
    wake();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const s = S.current;
    if (!s.ready) return;
    const row = rowFromEvent(e);
    if (s.painting) paintTo(row);
    if (row !== s.hover) {
      s.hover = row;
      s.drawDirty = true;
    }
    wake();
  };

  const endPaint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const s = S.current;
    s.painting = false;
    s.lastPaintRow = -1;
    if (e.type === 'pointerleave' || e.type === 'pointercancel') {
      s.hover = -1;
      s.drawDirty = true;
    }
    wake();
  };

  /* ---------------------------------------------------------------- */

  return (
    <div className="inst" ref={rootEl}>
      <div className="inst-panels">
        <figure className="panel-fig">
          <div className="panel panel-k">
            <canvas
              ref={kCanvas}
              width={N}
              height={N}
              aria-label="k-space magnitude. Drag to acquire phase-encode lines."
              role="img"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endPaint}
              onPointerLeave={endPaint}
              onPointerCancel={endPaint}
            />
            <span className="label panel-axis ky" aria-hidden="true">
              ky ↑
            </span>
            <span className="label panel-axis kx" aria-hidden="true">
              kx →
            </span>
          </div>
          <figcaption className="label panel-cap">
            <span>k-space</span>
            <span>log |F(kx, ky)|</span>
          </figcaption>
        </figure>
        <figure className="panel-fig">
          <div className="panel panel-i">
            <canvas
              ref={iCanvas}
              width={N}
              height={N}
              role="img"
              aria-label={
                source === 'phantom'
                  ? 'Shepp–Logan phantom reconstructed from the acquired k-space lines'
                  : 'Portrait of Andrew Van reconstructed from the acquired k-space lines'
              }
            />
          </div>
          <figcaption className="label panel-cap">
            <span>image</span>
            <span>|f(x, y)|</span>
          </figcaption>
        </figure>
      </div>

      <div className="inst-bar">
        <div className="seg" role="group" aria-label="Acquisition order">
          {ORDERS.map((o) => (
            <button
              key={o}
              type="button"
              className={o === order ? 'is-active' : undefined}
              aria-pressed={o === order}
              onClick={() => chooseOrder(o)}
            >
              {o}
            </button>
          ))}
        </div>
        <div className="seg" role="group" aria-label="Source image">
          {SOURCES.map((src) => (
            <button
              key={src}
              type="button"
              className={src === source ? 'is-active' : undefined}
              aria-pressed={src === source}
              disabled={src === 'portrait' && !portrait}
              onClick={() => setSource(src)}
            >
              {src}
            </button>
          ))}
        </div>
      </div>

      <div className="inst-bar">
        <p className="readout mono" style={{ margin: 0 }}>
          <span className="dot" ref={dotEl} aria-hidden="true" />
          <span>
            <b ref={countEl}>0</b> / {N} ky lines
          </span>
        </p>
        <div className="text-btns">
          <button type="button" className="text-btn" onClick={() => replay(order)}>
            replay
          </button>
          <button type="button" className="text-btn" onClick={clear}>
            clear
          </button>
          <button type="button" className="text-btn" onClick={fill}>
            fill
          </button>
        </div>
      </div>

      <p className="inst-hint">
        A live Fourier reconstruction. Drag across k-space to acquire lines by hand.
      </p>
    </div>
  );
}
