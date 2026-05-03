import { validasiInput, adaError } from './validasi.js';

/**
 * Membulatkan nilai ke atas ke kelipatan 100 terdekat.
 * @param {number} x
 * @returns {number}
 */
export function bulatkanKeAtas100(x) {
  if (x <= 0) return 0;
  return Math.ceil(x / 100) * 100;
}

/**
 * Menghitung harga jual berdasarkan komponen biaya.
 * @param {Object} input - { hargaModal, biayaTambahan, biayaPengiriman, biayaPenanganan, targetKeuntungan, biayaPlatform }
 * @returns {Object|null} hasil kalkulasi atau null jika input tidak valid
 */
export function kalkulasiHarga(input) {
  const errors = validasiInput(input);
  if (adaError(errors)) return null;

  const {
    hargaModal,
    biayaTambahan,
    biayaPengiriman,
    biayaPenanganan,
    targetKeuntungan,
    biayaPlatform,
  } = input;

  const totalBiayaTetap = hargaModal + biayaTambahan + biayaPengiriman + biayaPenanganan;
  const divisor = 1 - biayaPlatform / 100 - targetKeuntungan / 100;

  // divisor sudah dijamin > 0 karena validasi biayaPlatform + targetKeuntungan < 100
  const hargaJualRaw = totalBiayaTetap / divisor;
  const hargaJual = bulatkanKeAtas100(hargaJualRaw);

  const biayaPlatformRupiah = hargaJual * (biayaPlatform / 100);
  const totalBiaya = totalBiayaTetap + biayaPlatformRupiah;
  const marginKeuntungan = hargaJual - totalBiaya;
  const marginPersen = hargaJual > 0 ? (marginKeuntungan / hargaJual) * 100 : 0;

  return {
    hargaJual,
    biayaPlatformRupiah,
    totalBiaya,
    marginKeuntungan,
    marginPersen,
  };
}
