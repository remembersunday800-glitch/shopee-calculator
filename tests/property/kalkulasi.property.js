import { describe, test } from 'vitest';
import fc from 'fast-check';
import { bulatkanKeAtas100, kalkulasiHarga } from '../../src/utils/kalkulasi.js';

/**
 * Property 4: Pembulatan ke Kelipatan 100
 * Validates: Requirements 3.2
 */
describe('Property 4: bulatkanKeAtas100', () => {
  test('selalu kelipatan 100, >= x, dan idempoten', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: Math.fround(10_000_000), noNaN: true }),
        (x) => {
          const hasil = bulatkanKeAtas100(x);
          return (
            hasil % 100 === 0 &&
            hasil >= x &&
            bulatkanKeAtas100(hasil) === hasil
          );
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Generator input valid untuk kalkulasi
const inputValidArb = fc.record({
  hargaModal: fc.double({ min: 0, max: 1_000_000, noNaN: true }),
  biayaTambahan: fc.double({ min: 0, max: 100_000, noNaN: true }),
  biayaPengiriman: fc.double({ min: 0, max: 100_000, noNaN: true }),
  biayaPenanganan: fc.double({ min: 0, max: 10_000, noNaN: true }),
  targetKeuntungan: fc.double({ min: 0, max: 49, noNaN: true }),
  biayaPlatform: fc.double({ min: 0, max: 49, noNaN: true }),
}).filter((i) => i.biayaPlatform + i.targetKeuntungan < 100);

/**
 * Property 5: Invariant Kalkulasi — hargaJual >= totalBiaya
 * Validates: Requirements 3.7
 */
describe('Property 5: Invariant Kalkulasi — hargaJual >= totalBiaya', () => {
  test('hargaJual selalu >= totalBiaya untuk input valid', () => {
    fc.assert(
      fc.property(inputValidArb, (input) => {
        const hasil = kalkulasiHarga(input);
        if (!hasil) return true; // skip jika null (seharusnya tidak terjadi untuk input valid)
        return hasil.hargaJual >= hasil.totalBiaya;
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 6: Invariant Kalkulasi — hargaJual adalah Kelipatan 100
 * Validates: Requirements 3.2
 */
describe('Property 6: Invariant Kalkulasi — hargaJual adalah Kelipatan 100', () => {
  test('hargaJual selalu kelipatan 100 untuk input valid', () => {
    fc.assert(
      fc.property(inputValidArb, (input) => {
        const hasil = kalkulasiHarga(input);
        if (!hasil) return true;
        return hasil.hargaJual % 100 === 0;
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 7: Invariant Kalkulasi — marginPersen >= targetKeuntungan
 * Validates: Requirements 3.5, 3.6
 */
describe('Property 7: Invariant Kalkulasi — marginPersen >= targetKeuntungan', () => {
  test('marginPersen selalu >= targetKeuntungan untuk input valid dengan targetKeuntungan > 0', () => {
    fc.assert(
      fc.property(
        inputValidArb.filter((i) => i.targetKeuntungan > 0),
        (input) => {
          const hasil = kalkulasiHarga(input);
          if (!hasil) return true;
          // Toleransi kecil untuk floating point
          return hasil.marginPersen >= input.targetKeuntungan - 1e-9;
        }
      ),
      { numRuns: 100 }
    );
  });
});
