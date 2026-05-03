import HargaJualUtama from './HargaJualUtama.jsx';
import RincianBiaya from './RincianBiaya.jsx';

export default function HasilKalkulasi({ hasil, input }) {
  if (!hasil) {
    return (
      <div className="rounded-xl p-8 text-center" style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}>
        <p className="text-sm" style={{ color: '#A0A0A0' }}>
          Masukkan data produk untuk melihat hasil kalkulasi
        </p>
      </div>
    );
  }
  return (
    <div>
      <HargaJualUtama hargaJual={hasil.hargaJual} />
      <RincianBiaya hasil={hasil} input={input} />
    </div>
  );
}
