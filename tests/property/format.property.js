import { describe, test } from 'vitest';
import fc from 'fast-check';
import { formatRupiah } from '../../src/utils/format.js';

/**
 * Property 11: Format Rupiah Konsisten
 * Validates: Requirements 4.6
 */
describe('Property 11: Format Rupiah Konsisten', () => {
  test('formatRupiah selalu diawali "Rp ", menggunakan titik sebagai pemisah ribuan, dan hanya mengandung karakter valid', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100_000_000 }),
        (n) => {
          const hasil = formatRupiah(n);

          // Harus diawali "Rp "
          if (!hasil.startsWith('Rp ')) return false;

          // Bagian angka setelah "Rp "
          const bagianAngka = hasil.slice(3);

          // Hanya boleh mengandung digit dan titik
          if (!/^[\d.]+$/.test(bagianAngka)) return false;

          // Untuk angka >= 1000, harus ada pemisah titik
          if (n >= 1000 && !bagianAngka.includes('.')) return false;

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
