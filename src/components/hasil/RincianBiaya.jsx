import { formatRupiah, formatPersen } from '../../utils/format.js';

function BarisBiaya({ label, nilai, isTotal = false, isProfit = false }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isTotal ? '12px 0' : '8px 0',
      borderTop: isTotal ? '1px solid var(--border)' : 'none',
      marginTop: isTotal ? 4 : 0,
    }}>
      <span style={{
        fontSize: isTotal ? 13 : 12,
        fontWeight: isTotal ? 600 : 400,
        color: isProfit ? 'var(--success)' : isTotal ? '#fff' : 'var(--text-secondary)',
      }}>{label}</span>
      <span style={{
        fontSize: isTotal ? 14 : 13,
        fontWeight: isTotal ? 700 : 500,
        color: isProfit ? 'var(--success)' : isTotal ? '#fff' : 'var(--text-secondary)',
      }}>{formatRupiah(nilai)}</span>
    </div>
  );
}

export default function RincianBiaya({ hasil, input }) {
  if (!hasil || !input) return null;
  return (
    <div style={{
      borderRadius: 16,
      padding: '20px',
      backgroundColor: 'var(--bg-card)',
      border: '1px solid var(--border)',
    }}>
      <p style={{ margin: '0 0 16px', fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '2px', textTransform: 'uppercase' }}>
        Rincian Biaya
      </p>

      <BarisBiaya label="Harga Modal" nilai={input.hargaModal} />
      <BarisBiaya label="Biaya Tambahan" nilai={input.biayaTambahan} />
      <BarisBiaya label="Biaya Pengiriman" nilai={input.biayaPengiriman} />
      <BarisBiaya label="Biaya Penanganan" nilai={input.biayaPenanganan} />
      <BarisBiaya label={`Biaya Platform (${input.biayaPlatform}%)`} nilai={hasil.biayaPlatformRupiah} />
      <BarisBiaya label="Total Biaya" nilai={hasil.totalBiaya} isTotal />

      {/* Profit highlight */}
      <div style={{
        marginTop: 12,
        padding: '14px 16px',
        borderRadius: 12,
        backgroundColor: 'rgba(34,197,94,0.08)',
        border: '1px solid rgba(34,197,94,0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: 'var(--success)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Keuntungan Bersih
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 11, color: 'rgba(34,197,94,0.6)' }}>
            {formatPersen(hasil.marginPersen)} dari harga jual
          </p>
        </div>
        <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--success)', letterSpacing: '-0.5px' }}>
          {formatRupiah(hasil.marginKeuntungan)}
        </p>
      </div>
    </div>
  );
}
