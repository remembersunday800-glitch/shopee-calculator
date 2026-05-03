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
    setBiayaPenangananCustom,
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
      style={{ padding: '32px 24px' }}
    >
      <div style={{ maxWidth: 560 }}>
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
            Konfigurasi Biaya Platform
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
            Pilih kategori dan tier toko untuk mengisi biaya platform secara otomatis
          </p>
        </div>

        {errorKategori && (
          <div style={{
            marginBottom: 20, padding: '12px 16px', borderRadius: 10,
            backgroundColor: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)',
            fontSize: 13, color: 'var(--warning)',
          }}>
            {errorKategori}
          </div>
        )}

        {/* Kategori */}
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="kategoriProduk" style={{ display: 'block', fontSize: 12, fontWeight: 500, marginBottom: 8, color: 'var(--text-secondary)', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
            Kategori Produk
          </label>
          <select
            id="kategoriProduk"
            value={konfigurasi.kategoriId || ''}
            onChange={handleKategoriChange}
            disabled={loadingKategori}
            style={{
              width: '100%',
              padding: '12px 14px',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              color: '#fff',
              fontSize: 14,
              fontWeight: 500,
              outline: 'none',
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            <option value="">-- Pilih Kategori --</option>
            {kategori.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nama}</option>
            ))}
          </select>
          {loadingKategori && <p style={{ margin: '6px 0 0', fontSize: 11, color: 'var(--text-secondary)' }}>Memuat kategori...</p>}
        </div>

        {/* Tier Toko */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
            Tier Toko
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {TIER_OPTIONS.map(tier => {
              const isActive = konfigurasi.tierToko === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handleTierChange(tier.id)}
                  aria-pressed={isActive}
                  style={{
                    padding: '12px 8px',
                    borderRadius: 10,
                    border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                    backgroundColor: isActive ? 'rgba(238,77,45,0.1)' : 'var(--bg-input)',
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ display: 'block', fontSize: 13, fontWeight: 700 }}>{tier.label}</span>
                  <span style={{ display: 'block', fontSize: 11, opacity: 0.7, marginTop: 2 }}>{tier.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Biaya Penanganan */}
        <div style={{ marginBottom: 20 }}>
          <InputField
            id="biayaPenangananConfig"
            label="Biaya Penanganan Pesanan (per transaksi)"
            value={konfigurasi.biayaPenangananCustom}
            onChange={handleBiayaPenangananChange}
            satuan="rupiah"
            placeholder="1250"
          />
          <p style={{ margin: '-8px 0 0', fontSize: 11, color: 'var(--text-muted)' }}>
            Default Rp 1.250 — berlaku sejak Juli 2025, Shopee Indonesia
          </p>
        </div>

        {/* Biaya Platform Aktif */}
        <div style={{
          padding: '20px',
          borderRadius: 16,
          background: 'linear-gradient(135deg, #1A0E0A 0%, #160A06 100%)',
          border: '1px solid var(--border-accent)',
        }}>
          <p style={{ margin: '0 0 8px', fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Biaya Platform Aktif
          </p>
          <p style={{ margin: '0 0 4px', fontSize: 36, fontWeight: 900, color: 'var(--accent)', letterSpacing: '-1px', lineHeight: 1 }}>
            {biayaPlatformAktif}%
          </p>
          <p style={{ margin: '0 0 16px', fontSize: 12, color: 'var(--text-secondary)' }}>
            {konfigurasi.kategoriId
              ? `Berdasarkan kategori yang dipilih (${konfigurasi.tierToko})`
              : 'Nilai default — pilih kategori untuk menyesuaikan'}
          </p>

          {/* Tabel referensi */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)' }}>Panduan referensi:</p>
            {TIER_OPTIONS.map(tier => (
              <div key={tier.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: 12, color: '#fff' }}>{tier.label}</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{tier.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
