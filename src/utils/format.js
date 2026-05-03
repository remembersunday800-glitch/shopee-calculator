/**
 * Memformat angka ke format mata uang Rupiah.
 * @param {number} angka
 * @returns {string} - Contoh: "Rp 1.500.000"
 */
export function formatRupiah(angka) {
  if (angka === null || angka === undefined || isNaN(angka)) return 'Rp 0';
  return 'Rp ' + Math.round(angka).toLocaleString('id-ID');
}

/**
 * Memformat angka ke format persentase.
 * @param {number} angka
 * @param {number} desimal - jumlah angka desimal (default 2)
 * @returns {string} - Contoh: "6.50%"
 */
export function formatPersen(angka, desimal = 2) {
  if (angka === null || angka === undefined || isNaN(angka)) return '0.00%';
  return angka.toFixed(desimal) + '%';
}
