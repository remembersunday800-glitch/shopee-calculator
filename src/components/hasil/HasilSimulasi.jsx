import StatusMargin from './StatusMargin.jsx';
import { formatRupiah, formatPersen } from '../../utils/format.js';

export default function HasilSimulasi({ hasil }) {
  if (!hasil) {
    return (
      <div style={{
        borderRadius: 16,
        padding: '48px 24px',
        textAlign: 'center',
        backgroundColor: 'var(--bg-card)',
        border: '1px dashed var(--border)',
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>💡</div>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
          Masukkan harga target untuk melihat simulasi margin
        </p>
      </div>
    );
  }
  return (
    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <StatusMargin status={hasil.status} marginKeuntungan={hasil.marginKeuntungan} marginPersen={hasil.marginPersen} />
      <div style={{
        borderRadius: 16,
        padding: '20px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}>
        <p style={{ margin: '0 0 14px', fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Detail Simulasi
        </p>
        {[
          { label: 'Total Biaya', nilai: formatRupiah(hasil.totalBiaya) },
          { label: 'Biaya Platform', nilai: formatRupiah(hasil.biayaPlatformRupiah) },
          { label: 'Margin (%)', nilai: formatPersen(hasil.marginPersen) },
        ].map(({ label, nilai }) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{label}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{nilai}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
