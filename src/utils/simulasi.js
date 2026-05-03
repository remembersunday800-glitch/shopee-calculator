/**
 * Menghitung margin dan status keuntungan untuk harga target tertentu.
 * @param {number} hargaTarget
 * @param {Object} inputBiaya - { hargaModal, biayaTambahan, biayaPengiriman, biayaPenanganan, biayaPlatform }
 * @returns {Object} { marginKeuntungan, marginPersen, status, totalBiaya, biayaPlatformRupiah }
 */
export function simulasiMargin(hargaTarget, inputBiaya) {
  const {
    hargaModal,
    biayaTambahan,
    biayaPengiriman,
    biayaPenanganan,
    biayaPlatform,
  } = inputBiaya;

  const biayaPlatformRupiah = hargaTarget * (biayaPlatform / 100);
  const totalBiaya =
    hargaModal + biayaTambahan + biayaPengiriman + biayaPenanganan + biayaPlatformRupiah;
  const marginKeuntungan = hargaTarget - totalBiaya;
  const marginPersen = hargaTarget > 0 ? (marginKeuntungan / hargaTarget) * 100 : 0;

  let status;
  if (marginKeuntungan > 0) status = 'Untung';
  else if (marginKeuntungan === 0) status = 'Impas';
  else status = 'Rugi';

  return {
    marginKeuntungan,
    marginPersen,
    status,
    totalBiaya,
    biayaPlatformRupiah,
  };
}
