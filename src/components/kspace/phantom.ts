/**
 * Modified Shepp–Logan head phantom (Toft's high-contrast variant), sampled
 * onto an n×n grid with intensities normalised to [0, 1].
 *
 * Each ellipse: [intensity, semi-axis a, semi-axis b, centre x, centre y, angle°]
 */
const ELLIPSES: ReadonlyArray<readonly [number, number, number, number, number, number]> = [
  [1.0, 0.69, 0.92, 0.0, 0.0, 0],
  [-0.8, 0.6624, 0.874, 0.0, -0.0184, 0],
  [-0.2, 0.11, 0.31, 0.22, 0.0, -18],
  [-0.2, 0.16, 0.41, -0.22, 0.0, 18],
  [0.1, 0.21, 0.25, 0.0, 0.35, 0],
  [0.1, 0.046, 0.046, 0.0, 0.1, 0],
  [0.1, 0.046, 0.046, 0.0, -0.1, 0],
  [0.1, 0.046, 0.023, -0.08, -0.605, 0],
  [0.1, 0.023, 0.023, 0.0, -0.606, 0],
  [0.1, 0.023, 0.046, 0.06, -0.605, 0],
];

export function sheppLogan(n: number): Float32Array {
  const out = new Float32Array(n * n);
  const scale = 2 / n;
  let max = 0;

  for (const [a0, a, b, x0, y0, deg] of ELLIPSES) {
    const phi = (deg * Math.PI) / 180;
    const c = Math.cos(phi);
    const s = Math.sin(phi);
    const a2 = a * a;
    const b2 = b * b;
    for (let j = 0; j < n; j++) {
      // Image rows run downwards; the phantom's y axis points up.
      const y = -((j + 0.5) * scale - 1) - y0;
      for (let i = 0; i < n; i++) {
        const x = (i + 0.5) * scale - 1 - x0;
        const xr = x * c + y * s;
        const yr = -x * s + y * c;
        if ((xr * xr) / a2 + (yr * yr) / b2 <= 1) {
          const idx = j * n + i;
          out[idx] += a0;
          if (out[idx] > max) max = out[idx];
        }
      }
    }
  }

  if (max > 0) {
    for (let i = 0; i < out.length; i++) out[i] = Math.max(0, out[i]) / max;
  }
  return out;
}
