import { formatRupiah, formatPersen } from '../../utils/format.js';

const STATUS_CONFIG = {
  Untung: { color: '#22C55E', bg: 'rgba(34,197,94,0.1)', label: 'Untung' },
  Impas: { color: '#EAB308', bg: 'rgba(234,179,8,0.1)', label: 'Impas' },
  Rugi: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)', label: 'Rugi' },
};

export default function StatusMargin({ status, marginKeuntungan, marginPersen }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.Impas;
  return (
    <div
      className="rounded-xl p-4 text-center"
      style={{ backgroundColor: config.bg, border: `1px solid ${config.color}` }}
      aria-label={`Status: ${status}. Margin: ${formatRupiah(marginKeuntungan)} (${formatPersen(marginPersen)})`}
    >
      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
        style={{ backgroundColor: config.color, color: '#FFFFFF' }}>
        {config.label}
      </span>
      <p className="text-xl font-bold" style={{ color: config.color }}>
        {formatRupiah(marginKeuntungan)}
      </p>
      <p className="text-sm mt-1" style={{ color: config.color }}>
        {formatPersen(marginPersen)} dari harga jual
      </p>
      {status === 'Rugi' && (
        <p className="text-xs mt-2" style={{ color: '#EF4444' }}>
          Kerugian per unit: {formatRupiah(Math.abs(marginKeuntungan))}
        </p>
      )}
    </div>
  );
}
