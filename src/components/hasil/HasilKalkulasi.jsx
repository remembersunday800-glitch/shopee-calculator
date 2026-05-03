import HargaJualUtama from './HargaJualUtama.jsx';
import RincianBiaya from './RincianBiaya.jsx';

export default function HasilKalkulasi({ hasil, input }) {
  if (!hasil) {
    return (
      <div style={{
        borderRadius: 16,
        padding: '48px 24px',
        textAlign: 'center',
        backgroundColor: 'var(--bg-card)',
        border: '1px dashed var(--border)',
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🧮</div>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
          Masukkan data produk untuk melihat hasil kalkulasi
        </p>
      </div>
    );
  }
  return (
    <div className="animate-fade-up">
      <HargaJualUtama hargaJual={hasil.hargaJual} />
      <RincianBiaya hasil={hasil} input={input} />
    </div>
  );
}
