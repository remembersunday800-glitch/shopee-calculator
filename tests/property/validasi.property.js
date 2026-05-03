import { describe, test } from 'vitest';
import fc from 'fast-check';
import { validasiInput, adaError } from '../../src/utils/validasi.js';

const inputValidBase = {
  hargaModal: 50000,
  biayaTambahan: 0,
  biayaPengiriman: 0,
  biayaPenanganan: 1250,
  targetKeuntungan: 20,
  biayaPlatform: 9,
};

/**
 * Property 1: Validasi Rentang Input
 * Validates: Requirements 2.2, 2.3
 */
describe('Property 1: Validasi Rentang Input', () => {
  test('biayaPlatform di luar [0,30] selalu menghasilkan error', () => {
    fc.assert(
      fc.property(
        fc.double({ min: Math.fround(30.01), max: 1000, noNaN: true }),
        (biayaPlatform) => {
          const errors = validasiInput({ ...inputValidBase, biayaPlatform });
          return errors.biayaPlatform !== undefined;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('targetKeuntungan di luar [0,99] selalu menghasilkan error', () => {
    fc.assert(
      fc.property(
        fc.double({ min: Math.fround(99.01), max: 1000, noNaN: true }),
        (targetKeuntungan) => {
          const errors = validasiInput({ ...inputValidBase, targetKeuntungan });
          return errors.targetKeuntungan !== undefined;
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 2: Validasi Kombinasi Biaya
 * Validates: Requirements 2.4
 */
describe('Property 2: Validasi Kombinasi Biaya', () => {
  test('biayaPlatform + targetKeuntungan >= 100 selalu menghasilkan error kombinasi', () => {
    fc.assert(
      fc.property(
        fc.record({
          biayaPlatform: fc.double({ min: 0, max: 30, noNaN: true }),
          targetKeuntungan: fc.double({ min: 0, max: 99, noNaN: true }),
        }).filter(({ biayaPlatform, targetKeuntungan }) => biayaPlatform + targetKeuntungan >= 100),
        ({ biayaPlatform, targetKeuntungan }) => {
          const errors = validasiInput({ ...inputValidBase, biayaPlatform, targetKeuntungan });
          return errors.kombinasi !== undefined;
        }
      ),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 3: Validasi Nilai Negatif
 * Validates: Requirements 2.1
 */
describe('Property 3: Validasi Nilai Negatif', () => {
  test('hargaModal negatif selalu menghasilkan error', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -1_000_000, max: -Number.EPSILON, noNaN: true }),
        (hargaModal) => {
          const errors = validasiInput({ ...inputValidBase, hargaModal });
          return errors.hargaModal !== undefined;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('biayaTambahan negatif selalu menghasilkan error', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -1_000_000, max: -Number.EPSILON, noNaN: true }),
        (biayaTambahan) => {
          const errors = validasiInput({ ...inputValidBase, biayaTambahan });
          return errors.biayaTambahan !== undefined;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('biayaPengiriman negatif selalu menghasilkan error', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -1_000_000, max: -Number.EPSILON, noNaN: true }),
        (biayaPengiriman) => {
          const errors = validasiInput({ ...inputValidBase, biayaPengiriman });
          return errors.biayaPengiriman !== undefined;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('biayaPenanganan negatif selalu menghasilkan error', () => {
    fc.assert(
      fc.property(
        fc.double({ min: -1_000_000, max: -Number.EPSILON, noNaN: true }),
        (biayaPenanganan) => {
          const errors = validasiInput({ ...inputValidBase, biayaPenanganan });
          return errors.biayaPenanganan !== undefined;
        }
      ),
      { numRuns: 100 }
    );
  });
});
