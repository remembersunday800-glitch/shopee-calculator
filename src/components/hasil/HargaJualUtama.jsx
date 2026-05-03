import { formatRupiah } from '../../utils/format.js';

export default function HargaJualUtama({ hargaJual }) {
  return (
    <div className="rounded-xl p-5 mb-4 text-center" style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}>
      <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#A0A0A0' }}>
        Harga Jual Rekomendasi
      </p>
      <p className="text-3xl font-bold" style={{ color: '#EE4D2D' }}>
        {formatRupiah(hargaJual)}
      </p>
    </div>
  );
}
