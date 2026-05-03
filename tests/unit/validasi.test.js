import { describe, test, expect } from 'vitest';
import { validasiInput, validasiHargaTarget, adaError } from '../../src/utils/validasi.js';

const inputValid = {
  hargaModal: 50000,
  biayaTambahan: 0,
  biayaPengiriman: 0,
  biayaPenanganan: 1250,
  targetKeuntungan: 20,
  biayaPlatform: 9,
};

describe('validasiInput', () => {
  test('input valid tidak ada error', () => {
    expect(adaError(validasiInput(inputValid))).toBe(false);
  });

  test('hargaModal negatif menghasilkan error', () => {
    const errors = validasiInput({ ...inputValid, hargaModal: -1 });
    expect(errors.hargaModal).toBeDefined();
  });

  test('biayaTambahan negatif menghasilkan error', () => {
    const errors = validasiInput({ ...inputValid, biayaTambahan: -0.01 });
    expect(errors.biayaTambahan).toBeDefined();
  });

  test('biayaPengiriman negatif menghasilkan error', () => {
    const errors = validasiInput({ ...inputValid, biayaPengiriman: -100 });
    expect(errors.biayaPengiriman).toBeDefined();
  });

  test('biayaPenanganan negatif menghasilkan error', () => {
    const errors = validasiInput({ ...inputValid, biayaPenanganan: -1 });
    expect(errors.biayaPenanganan).toBeDefined();
  });

  test('targetKeuntungan > 99 menghasilkan error', () => {
    const errors = validasiInput({ ...inputValid, targetKeuntungan: 100 });
    expect(errors.targetKeuntungan).toBeDefined();
  });

  test('targetKeuntungan negatif menghasilkan error', () => {
    const errors = validasiInput({ ...inputValid, targetKeuntungan: -1 });
    expect(errors.targetKeuntungan).toBeDefined();
  });

  test('targetKeuntungan = 99 valid', () => {
    const errors = validasiInput({ ...inputValid, targetKeuntungan: 99 });
    expect(errors.targetKeuntungan).toBeUndefined();
  });

  test('biayaPlatform > 30 menghasilkan error', () => {
    const errors = validasiInput({ ...inputValid, biayaPlatform: 31 });
    expect(errors.biayaPlatform).toBeDefined();
  });

  test('biayaPlatform negatif menghasilkan error', () => {
    const errors = validasiInput({ ...inputValid, biayaPlatform: -1 });
    expect(errors.biayaPlatform).toBeDefined();
  });

  test('biayaPlatform = 30 valid', () => {
    const errors = validasiInput({ ...inputValid, biayaPlatform: 30, targetKeuntungan: 0 });
    expect(errors.biayaPlatform).toBeUndefined();
  });

  test('kombinasi biayaPlatform + targetKeuntungan >= 100 menghasilkan error', () => {
    // biayaPlatform=30 (valid, max), targetKeuntungan=70 (valid, <99), tapi 30+70=100 >= 100
    const errors = validasiInput({ ...inputValid, biayaPlatform: 30, targetKeuntungan: 70 });
    expect(errors.kombinasi).toBeDefined();
  });

  test('kombinasi biayaPlatform + targetKeuntungan = 99 valid', () => {
    const errors = validasiInput({ ...inputValid, biayaPlatform: 30, targetKeuntungan: 69 });
    expect(errors.kombinasi).toBeUndefined();
  });

  test('semua biaya 0 dan targetKeuntungan 0 valid', () => {
    const errors = validasiInput({
      hargaModal: 0,
      biayaTambahan: 0,
      biayaPengiriman: 0,
      biayaPenanganan: 0,
      targetKeuntungan: 0,
      biayaPlatform: 0,
    });
    expect(adaError(errors)).toBe(false);
  });
});

describe('validasiHargaTarget', () => {
  test('string kosong mengembalikan string kosong (tidak ada error)', () => {
    expect(validasiHargaTarget('')).toBe('');
  });

  test('null mengembalikan string kosong', () => {
    expect(validasiHargaTarget(null)).toBe('');
  });

  test('undefined mengembalikan string kosong', () => {
    expect(validasiHargaTarget(undefined)).toBe('');
  });

  test('angka valid mengembalikan string kosong', () => {
    expect(validasiHargaTarget(50000)).toBe('');
  });

  test('angka 0 menghasilkan error', () => {
    expect(validasiHargaTarget(0)).not.toBe('');
  });

  test('angka negatif menghasilkan error', () => {
    expect(validasiHargaTarget(-100)).not.toBe('');
  });

  test('string bukan angka menghasilkan error', () => {
    expect(validasiHargaTarget('abc')).not.toBe('');
  });
});

describe('adaError', () => {
  test('objek kosong mengembalikan false', () => {
    expect(adaError({})).toBe(false);
  });

  test('objek dengan key mengembalikan true', () => {
    expect(adaError({ hargaModal: 'error' })).toBe(true);
  });
});
