import { useKonfigurasi } from '../../hooks/useKonfigurasi.js';
import InputField from '../InputField.jsx';

const TIER_OPTIONS = [
  { id: 'non-star', label: 'Non-Star', desc: '~7–10%' },
  { id: 'star', label: 'Star', desc: '~8–11%' },
  { id: 'star-plus', label: 'Star+ / Mall', desc: '~10–15%' },
];

export default function TabKonfigurasi({ onKonfigurasiChange }) {
  const {
    kategori, loadingKategori, errorKategori,
    konfigurasi, biayaPlatformAktif,
    setBiayaDariKategori, setTierToko,
    setBiayaPenangananCustom, setBiayaPlatformManual,
  } = useKonfigurasi();

  const handleKategoriChange = (e) => {
    const kategoriId = e.target.value;
    setBiayaDariKategori(kategoriId, konfigurasi.tierToko);
    onKonfigurasiChange?.({ biayaPlatform: biayaPlatformAktif, biayaPenanganan: konfigurasi.biayaPenangananCustom });
  };

  const handleTierChange = (tierId) => {
    setTierToko(tierId);
    onKonfigurasiChange?.({ biayaPlatform: biayaPlatformAktif, biayaPenanganan: konfigurasi.biayaPenangananCustom });
  };

  const handleBiayaPenangananChange = (nilai) => {
    const num = parseFloat(nilai) || 0;
    setBiayaPenangananCustom(num);
    onKonfigurasiChange?.({ biayaPlatform: biayaPlatformAktif, biayaPenanganan: num });
  };

  return (
    <div
      id="panel-konfigurasi"
      role="tabpanel"
      aria-labelledby="tab-konfigurasi"
      className="p-4 lg:p-6"
    >
      <h2 className="text-base font-semibold mb-1" style={{ color: '#FFFFFF' }}>Konfigurasi Biaya Platform</h2>
      <p className="text-sm mb-5" style={{ color: '#A0A0A0' }}>
        Pilih kategori produk dan tier toko untuk mengisi biaya platform secara otomatis.
      </p>

      {errorKategori && (
        <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(234,179,8,0.1)', border: '1px solid #EAB308', color: '#EAB308' }}>
          {errorKategori}
        </div>
      )}

      {/* Kategori Produk */}
      <div className="mb-5">
        <label htmlFor="kategoriProduk" className="block text-sm font-medium mb-1.5" style={{ color: '#A0A0A0' }}>
          Kategori Produk
        </label>
        <select
          id="kategoriProduk"
          value={konfigurasi.kategoriId || ''}
          onChange={handleKategoriChange}
          disabled={loadingKategori}
          className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#EE4D2D] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0D0D0D]"
          style={{ backgroundColor: '#242424', color: '#FFFFFF', border: '1px solid #2A2A2A' }}
        >
          <option value="">-- Pilih Kategori --</option>
          {kategori.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nama}</option>
          ))}
        </select>
        {loadingKategori && <p className="text-xs mt-1" style={{ color: '#A0A0A0' }}>Memuat kategori...</p>}
      </div>

      {/* Tier Toko */}
      <div className="mb-5">
        <p className="text-sm font-medium mb-2" style={{ color: '#A0A0A0' }}>Tier Toko</p>
        <div className="grid grid-cols-3 gap-2">
          {TIER_OPTIONS.map(tier => {
            const isActive = konfigurasi.tierToko === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => handleTierChange(tier.id)}
                aria-pressed={isActive}
                className="py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EE4D2D] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0D0D0D]"
                style={{
                  backgroundColor: isActive ? '#EE4D2D' : '#242424',
                  color: isActive ? '#FFFFFF' : '#A0A0A0',
                  border: isActive ? '1px solid #EE4D2D' : '1px solid #2A2A2A',
                }}
              >
                <span className="block font-semibold">{tier.label}</span>
                <span className="block text-xs opacity-75">{tier.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Biaya Penanganan */}
      <div className="mb-5">
        <InputField
          id="biayaPenangananConfig"
          label="Biaya Penanganan Pesanan (per transaksi)"
          value={konfigurasi.biayaPenangananCustom}
          onChange={handleBiayaPenangananChange}
          satuan="rupiah"
          placeholder="1250"
        />
        <p className="text-xs mt-1" style={{ color: '#A0A0A0' }}>
          Default Rp 1.250 (berlaku sejak Juli 2025, Shopee Indonesia)
        </p>
      </div>

      {/* Biaya Platform Aktif */}
      <div className="rounded-xl p-4" style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}>
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#A0A0A0' }}>
          Biaya Platform Aktif
        </p>
        <p className="text-2xl font-bold" style={{ color: '#EE4D2D' }}>
          {biayaPlatformAktif}%
        </p>
        <p className="text-xs mt-1" style={{ color: '#A0A0A0' }}>
          {konfigurasi.kategoriId
            ? `Berdasarkan kategori yang dipilih (${konfigurasi.tierToko})`
            : 'Nilai default — pilih kategori untuk menyesuaikan'}
        </p>

        {/* Tabel referensi */}
        <div className="mt-4">
          <p className="text-xs font-medium mb-2" style={{ color: '#A0A0A0' }}>Panduan Referensi Biaya Platform:</p>
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left py-1" style={{ color: '#A0A0A0' }}>Tier</th>
                <th className="text-right py-1" style={{ color: '#A0A0A0' }}>Estimasi Biaya</th>
              </tr>
            </thead>
            <tbody>
              {TIER_OPTIONS.map(tier => (
                <tr key={tier.id} style={{ borderTop: '1px solid #2A2A2A' }}>
                  <td className="py-1.5" style={{ color: '#FFFFFF' }}>{tier.label}</td>
                  <td className="text-right py-1.5" style={{ color: '#A0A0A0' }}>{tier.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
