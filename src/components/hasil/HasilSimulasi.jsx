import StatusMargin from './StatusMargin.jsx';
import { formatRupiah, formatPersen } from '../../utils/format.js';

export default function HasilSimulasi({ hasil }) {
  if (!hasil) {
    return (
      <div className="rounded-xl p-8 text-center" style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}>
        <p className="text-sm" style={{ color: '#A0A0A0' }}>
          Masukkan harga target untuk melihat simulasi margin
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <StatusMargin status={hasil.status} marginKeuntungan={hasil.marginKeuntungan} marginPersen={hasil.marginPersen} />
      <div className="rounded-xl p-4" style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}>
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#A0A0A0' }}>
          Detail Simulasi
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span style={{ color: '#A0A0A0' }}>Total Biaya</span>
            <span style={{ color: '#FFFFFF' }}>{formatRupiah(hasil.totalBiaya)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: '#A0A0A0' }}>Biaya Platform</span>
            <span style={{ color: '#FFFFFF' }}>{formatRupiah(hasil.biayaPlatformRupiah)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ color: '#A0A0A0' }}>Margin (%)</span>
            <span style={{ color: '#FFFFFF' }}>{formatPersen(hasil.marginPersen)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
