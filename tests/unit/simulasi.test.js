import { describe, test, expect } from 'vitest';
import { simulasiMargin } from '../../src/utils/simulasi.js';

const inputBiaya = {
  hargaModal: 50000,
  biayaTambahan: 0,
  biayaPengiriman: 0,
  biayaPenanganan: 1250,
  biayaPlatform: 9,
};

describe('simulasiMargin', () => {
  test('status Untung jika harga target tinggi', () => {
    const hasil = simulasiMargin(100000, inputBiaya);
    expect(hasil.status).toBe('Untung');
  });

  test('status Rugi jika harga target terlalu rendah', () => {
    const hasil = simulasiMargin(10000, inputBiaya);
    expect(hasil.status).toBe('Rugi');
  });

  test('marginKeuntungan positif saat status Untung', () => {
    const hasil = simulasiMargin(100000, inputBiaya);
    expect(hasil.marginKeuntungan).toBeGreaterThan(0);
  });

  test('marginKeuntungan negatif saat status Rugi', () => {
    const hasil = simulasiMargin(10000, inputBiaya);
    expect(hasil.marginKeuntungan).toBeLessThan(0);
  });

  test('status Impas saat marginKeuntungan = 0', () => {
    // Hitung harga yang tepat untuk impas: hargaTarget = totalBiayaTetap / (1 - biayaPlatform/100)
    // totalBiayaTetap = 50000 + 0 + 0 + 1250 = 51250
    // hargaTarget = 51250 / (1 - 0.09) = 51250 / 0.91 ≈ 56318.68...
    // Kita buat kasus impas dengan biaya sederhana
    const inputImpas = {
      hargaModal: 0,
      biayaTambahan: 0,
      biayaPengiriman: 0,
      biayaPenanganan: 0,
      biayaPlatform: 0,
    };
    const hasil = simulasiMargin(0, inputImpas);
    // hargaTarget = 0, totalBiaya = 0, marginKeuntungan = 0
    expect(hasil.status).toBe('Impas');
  });

  test('hasil memiliki semua field yang diharapkan', () => {
    const hasil = simulasiMargin(100000, inputBiaya);
    expect(hasil).toHaveProperty('marginKeuntungan');
    expect(hasil).toHaveProperty('marginPersen');
    expect(hasil).toHaveProperty('status');
    expect(hasil).toHaveProperty('totalBiaya');
    expect(hasil).toHaveProperty('biayaPlatformRupiah');
  });

  test('biayaPlatformRupiah dihitung dari hargaTarget', () => {
    const hargaTarget = 100000;
    const hasil = simulasiMargin(hargaTarget, inputBiaya);
    const expectedBiayaPlatform = hargaTarget * (inputBiaya.biayaPlatform / 100);
    expect(hasil.biayaPlatformRupiah).toBeCloseTo(expectedBiayaPlatform, 5);
  });

  test('marginPersen dihitung dengan benar', () => {
    const hargaTarget = 100000;
    const hasil = simulasiMargin(hargaTarget, inputBiaya);
    const expectedMarginPersen = (hasil.marginKeuntungan / hargaTarget) * 100;
    expect(hasil.marginPersen).toBeCloseTo(expectedMarginPersen, 5);
  });

  test('marginPersen = 0 jika hargaTarget = 0', () => {
    const hasil = simulasiMargin(0, inputBiaya);
    expect(hasil.marginPersen).toBe(0);
  });
});
