import { describe, test } from 'vitest';
import fc from 'fast-check';
import { simulasiMargin } from '../../src/utils/simulasi.js';

/**
 * Property 8: Konsistensi Status Simulasi
 * Validates: Requirements 6.4, 6.5, 6.6
 */
describe('Property 8: Konsistensi Status Simulasi', () => {
  test('status bersifat exhaustive dan mutually exclusive sesuai tanda marginKeuntungan', () => {
    fc.assert(
      fc.property(
        fc.record({
          hargaTarget: fc.double({ min: Number.EPSILON, max: 10_000_000, noNaN: true }),
          inputBiaya: fc.record({
            hargaModal: fc.double({ min: 0, max: 1_000_000, noNaN: true }),
            biayaTambahan: fc.double({ min: 0, max: 100_000, noNaN: true }),
            biayaPengiriman: fc.double({ min: 0, max: 100_000, noNaN: true }),
            biayaPenanganan: fc.double({ min: 0, max: 10_000, noNaN: true }),
            biayaPlatform: fc.double({ min: 0, max: 30, noNaN: true }),
          }),
        }),
        ({ hargaTarget, inputBiaya }) => {
          const hasil = simulasiMargin(hargaTarget, inputBiaya);

          // Status harus salah satu dari tiga nilai yang valid
          const statusValid = ['Untung', 'Impas', 'Rugi'];
          if (!statusValid.includes(hasil.status)) return false;

          // Status harus konsisten dengan tanda marginKeuntungan
          if (hasil.marginKeuntungan > 0 && hasil.status !== 'Untung') return false;
          if (hasil.marginKeuntungan === 0 && hasil.status !== 'Impas') return false;
          if (hasil.marginKeuntungan < 0 && hasil.status !== 'Rugi') return false;

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
