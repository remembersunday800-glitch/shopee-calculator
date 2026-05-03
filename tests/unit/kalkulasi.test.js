import { describe, test, expect } from 'vitest';
import { bulatkanKeAtas100, kalkulasiHarga } from '../../src/utils/kalkulasi.js';

describe('bulatkanKeAtas100', () => {
  test('100 tetap 100', () => expect(bulatkanKeAtas100(100)).toBe(100));
  test('101 menjadi 200', () => expect(bulatkanKeAtas100(101)).toBe(200));
  test('0 tetap 0', () => expect(bulatkanKeAtas100(0)).toBe(0));
  test('50 menjadi 100', () => expect(bulatkanKeAtas100(50)).toBe(100));
  test('1 menjadi 100', () => expect(bulatkanKeAtas100(1)).toBe(100));
  test('200 tetap 200', () => expect(bulatkanKeAtas100(200)).toBe(200));
  test('201 menjadi 300', () => expect(bulatkanKeAtas100(201)).toBe(300));
  test('99.9 menjadi 100', () => expect(bulatkanKeAtas100(99.9)).toBe(100));
  test('nilai negatif mengembalikan 0', () => expect(bulatkanKeAtas100(-50)).toBe(0));
});

describe('kalkulasiHarga', () => {
  const inputValid = {
    hargaModal: 50000,
    biayaTambahan: 0,
    biayaPengiriman: 0,
    biayaPenanganan: 1250,
    targetKeuntungan: 20,
    biayaPlatform: 9,
  };

  test('mengembalikan null untuk input tidak valid (hargaModal negatif)', () => {
    expect(kalkulasiHarga({ ...inputValid, hargaModal: -1 })).toBeNull();
  });

  test('mengembalikan null untuk biayaPlatform > 30', () => {
    expect(kalkulasiHarga({ ...inputValid, biayaPlatform: 31 })).toBeNull();
  });

  test('mengembalikan null untuk kombinasi >= 100', () => {
    expect(kalkulasiHarga({ ...inputValid, biayaPlatform: 50, targetKeuntungan: 50 })).toBeNull();
  });

  test('hargaJual adalah kelipatan 100', () => {
    const hasil = kalkulasiHarga(inputValid);
    expect(hasil).not.toBeNull();
    expect(hasil.hargaJual % 100).toBe(0);
  });

  test('hargaJual >= totalBiaya', () => {
    const hasil = kalkulasiHarga(inputValid);
    expect(hasil).not.toBeNull();
    expect(hasil.hargaJual).toBeGreaterThanOrEqual(hasil.totalBiaya);
  });

  test('marginPersen >= targetKeuntungan', () => {
    const hasil = kalkulasiHarga(inputValid);
    expect(hasil).not.toBeNull();
    expect(hasil.marginPersen).toBeGreaterThanOrEqual(inputValid.targetKeuntungan);
  });

  test('hasil memiliki semua field yang diharapkan', () => {
    const hasil = kalkulasiHarga(inputValid);
    expect(hasil).not.toBeNull();
    expect(hasil).toHaveProperty('hargaJual');
    expect(hasil).toHaveProperty('biayaPlatformRupiah');
    expect(hasil).toHaveProperty('totalBiaya');
    expect(hasil).toHaveProperty('marginKeuntungan');
    expect(hasil).toHaveProperty('marginPersen');
  });

  test('semua biaya 0 dan targetKeuntungan 0 menghasilkan hargaJual 0', () => {
    const hasil = kalkulasiHarga({
      hargaModal: 0,
      biayaTambahan: 0,
      biayaPengiriman: 0,
      biayaPenanganan: 0,
      targetKeuntungan: 0,
      biayaPlatform: 0,
    });
    expect(hasil).not.toBeNull();
    expect(hasil.hargaJual).toBe(0);
  });

  test('biayaPlatformRupiah dihitung dari hargaJual', () => {
    const hasil = kalkulasiHarga(inputValid);
    expect(hasil).not.toBeNull();
    const expectedBiayaPlatform = hasil.hargaJual * (inputValid.biayaPlatform / 100);
    expect(hasil.biayaPlatformRupiah).toBeCloseTo(expectedBiayaPlatform, 5);
  });
});
