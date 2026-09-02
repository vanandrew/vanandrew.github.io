/**
 * Small, allocation-free radix-2 FFT for square 2-D arrays.
 *
 * Data is stored row-major in separate real/imaginary Float32Arrays. The
 * forward transform uses e^{-2πi jk/n}; the inverse divides by n per axis so a
 * forward followed by an inverse is the identity.
 */
export class FFT2D {
  readonly n: number;
  private readonly rev: Uint32Array;
  private readonly cos: Float32Array;
  private readonly sin: Float32Array;
  private readonly colRe: Float32Array;
  private readonly colIm: Float32Array;

  constructor(n: number) {
    if (n < 2 || (n & (n - 1)) !== 0) {
      throw new Error(`FFT size must be a power of two, got ${n}`);
    }
    this.n = n;

    const bits = Math.log2(n);
    this.rev = new Uint32Array(n);
    for (let i = 0; i < n; i++) {
      let r = 0;
      for (let b = 0; b < bits; b++) r |= ((i >> b) & 1) << (bits - 1 - b);
      this.rev[i] = r;
    }

    const half = n >> 1;
    this.cos = new Float32Array(half);
    this.sin = new Float32Array(half);
    for (let k = 0; k < half; k++) {
      const t = (2 * Math.PI * k) / n;
      this.cos[k] = Math.cos(t);
      this.sin[k] = Math.sin(t);
    }

    this.colRe = new Float32Array(n);
    this.colIm = new Float32Array(n);
  }

  /** In-place 1-D transform of a length-n slice. */
  fft1(re: Float32Array, im: Float32Array, inverse: boolean): void {
    const n = this.n;
    const rev = this.rev;

    for (let i = 0; i < n; i++) {
      const j = rev[i];
      if (j > i) {
        let t = re[i];
        re[i] = re[j];
        re[j] = t;
        t = im[i];
        im[i] = im[j];
        im[j] = t;
      }
    }

    const sign = inverse ? 1 : -1;
    for (let len = 2; len <= n; len <<= 1) {
      const half = len >> 1;
      const step = n / len;
      for (let i = 0; i < n; i += len) {
        for (let j = 0, k = 0; j < half; j++, k += step) {
          const wr = this.cos[k];
          const wi = sign * this.sin[k];
          const a = i + j;
          const b = a + half;
          const xr = re[b] * wr - im[b] * wi;
          const xi = re[b] * wi + im[b] * wr;
          re[b] = re[a] - xr;
          im[b] = im[a] - xi;
          re[a] += xr;
          im[a] += xi;
        }
      }
    }

    if (inverse) {
      const s = 1 / n;
      for (let i = 0; i < n; i++) {
        re[i] *= s;
        im[i] *= s;
      }
    }
  }

  /** In-place 2-D transform of an n×n row-major array. */
  fft2(re: Float32Array, im: Float32Array, inverse: boolean): void {
    const n = this.n;

    for (let r = 0; r < n; r++) {
      const off = r * n;
      this.fft1(re.subarray(off, off + n), im.subarray(off, off + n), inverse);
    }

    const cr = this.colRe;
    const ci = this.colIm;
    for (let c = 0; c < n; c++) {
      for (let r = 0; r < n; r++) {
        cr[r] = re[r * n + c];
        ci[r] = im[r * n + c];
      }
      this.fft1(cr, ci, inverse);
      for (let r = 0; r < n; r++) {
        re[r * n + c] = cr[r];
        im[r * n + c] = ci[r];
      }
    }
  }
}
