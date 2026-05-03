/**
 * Memvalidasi semua input kalkulator.
 * @param {Object} input
 * @returns {Object} errors - objek dengan pesan error per field
 */
export function validasiInput(input) {
  const errors = {};

  // Validasi nilai negatif
  if (input.hargaModal < 0) errors.hargaModal = 'Harga modal tidak boleh negatif';
  if (input.biayaTambahan < 0) errors.biayaTambahan = 'Biaya tambahan tidak boleh negatif';
  if (input.biayaPengiriman < 0) errors.biayaPengiriman = 'Biaya pengiriman tidak boleh negatif';
  if (input.biayaPenanganan < 0) errors.biayaPenanganan = 'Biaya penanganan tidak boleh negatif';

  // Validasi rentang persentase
  if (input.targetKeuntungan < 0 || input.targetKeuntungan > 99)
    errors.targetKeuntungan = 'Target keuntungan harus antara 0–99%';
  if (input.biayaPlatform < 0 || input.biayaPlatform > 30)
    errors.biayaPlatform = 'Biaya platform harus antara 0–30%';

  // Validasi kombinasi
  if (
    !errors.biayaPlatform &&
    !errors.targetKeuntungan &&
    input.biayaPlatform + input.targetKeuntungan >= 100
  ) {
    errors.kombinasi = 'Total biaya platform dan target keuntungan tidak boleh >= 100%';
  }

  return errors;
}

/**
 * Memvalidasi harga target untuk simulasi.
 * @param {number|string} hargaTarget
 * @returns {string} pesan error atau string kosong jika valid
 */
export function validasiHargaTarget(hargaTarget) {
  const nilai = parseFloat(hargaTarget);
  if (hargaTarget === '' || hargaTarget === null || hargaTarget === undefined) return '';
  if (isNaN(nilai)) return 'Harga target harus berupa angka';
  if (nilai <= 0) return 'Harga target harus lebih dari 0';
  return '';
}

/**
 * Mengecek apakah ada error dalam objek errors.
 * @param {Object} errors
 * @returns {boolean}
 */
export function adaError(errors) {
  return Object.keys(errors).length > 0;
}
