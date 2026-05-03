import { formatRupiah, formatPersen } from '../../utils/format.js';

function BarisBiaya({ label, nilai, highlight = false }) {
  return (
    <div className="flex justify-between items-center py-1.5">
      <span className="text-sm" style={{ color: '#A0A0A0' }}>{label}</span>
      <span className="text-sm font-medium" style={{ color: highlight ? '#FFFFFF' : '#A0A0A0' }}>
        {formatRupiah(nilai)}
      </span>
    </div>
  );
}

export default function RincianBiaya({ hasil, input }) {
  if (!hasil || !input) return null;
  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}>
      <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#A0A0A0' }}>
        Rincian Biaya
      </h3>
      <div className="divide-y" style={{ borderColor: '#2A2A2A' }}>
        <BarisBiaya label="Harga Modal" nilai={input.hargaModal} />
        <BarisBiaya label="Biaya Tambahan" nilai={input.biayaTambahan} />
        <BarisBiaya label="Biaya Pengiriman" nilai={input.biayaPengiriman} />
        <BarisBiaya label="Biaya Penanganan" nilai={input.biayaPenanganan} />
        <BarisBiaya label={`Biaya Platform (${input.biayaPlatform}%)`} nilai={hasil.biayaPlatformRupiah} />
        <div className="flex justify-between items-center py-1.5 mt-1">
          <span className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>Total Biaya</span>
          <span className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>{formatRupiah(hasil.totalBiaya)}</span>
        </div>
        <div className="flex justify-between items-center py-1.5">
          <span className="text-sm font-semibold" style={{ color: '#22C55E' }}>Keuntungan Bersih</span>
          <div className="text-right">
            <span className="text-sm font-semibold block" style={{ color: '#22C55E' }}>{formatRupiah(hasil.marginKeuntungan)}</span>
            <span className="text-xs" style={{ color: '#22C55E' }}>{formatPersen(hasil.marginPersen)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
