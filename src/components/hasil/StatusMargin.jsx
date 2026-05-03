import { formatRupiah, formatPersen } from '../../utils/format.js';

const STATUS_CONFIG = {
  Untung: {
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.25)',
    label: 'Untung',
    emoji: '📈',
  },
  Impas: {
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
    label: 'Impas',
    emoji: '⚖️',
  },
  Rugi: {
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.25)',
    label: 'Rugi',
    emoji: '📉',
  },
};

export default function StatusMargin({ status, marginKeuntungan, marginPersen }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.Impas;
  return (
    <div
      style={{
        borderRadius: 16,
        padding: '24px',
        textAlign: 'center',
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
      }}
      aria-label={`Status: ${status}. Margin: ${formatRupiah(marginKeuntungan)} (${formatPersen(marginPersen)})`}
    >
      <div style={{ fontSize: 28, marginBottom: 8 }}>{config.emoji}</div>
      <span style={{
        display: 'inline-block',
        padding: '4px 14px',
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        backgroundColor: config.color,
        color: '#fff',
        marginBottom: 12,
      }}>
        {config.label}
      </span>
      <p style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 800, color: config.color, letterSpacing: '-1px' }}>
        {formatRupiah(marginKeuntungan)}
      </p>
      <p style={{ margin: 0, fontSize: 13, color: config.color, opacity: 0.8 }}>
        {formatPersen(marginPersen)} dari harga jual
      </p>
      {status === 'Rugi' && (
        <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--error)', opacity: 0.8 }}>
          Kerugian per unit: {formatRupiah(Math.abs(marginKeuntungan))}
        </p>
      )}
    </div>
  );
}
