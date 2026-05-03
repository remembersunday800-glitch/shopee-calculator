import { formatRupiah } from '../../utils/format.js';

export default function HargaJualUtama({ hargaJual }) {
  return (
    <div style={{
      borderRadius: 16,
      padding: '32px 24px',
      marginBottom: 16,
      textAlign: 'center',
      background: 'linear-gradient(135deg, #1A0E0A 0%, #1E1010 50%, #160A06 100%)',
      border: '1px solid var(--border-accent)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow effect */}
      <div style={{
        position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)',
        width: 200, height: 100,
        background: 'radial-gradient(ellipse, rgba(238,77,45,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <p style={{ margin: '0 0 12px', fontSize: 10, fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '2px', textTransform: 'uppercase' }}>
        Harga Jual Rekomendasi
      </p>
      <p style={{
        margin: 0,
        fontSize: 42,
        fontWeight: 900,
        color: '#fff',
        letterSpacing: '-2px',
        lineHeight: 1,
      }}>
        {formatRupiah(hargaJual)}
      </p>
      <div style={{
        display: 'inline-block',
        marginTop: 12,
        padding: '4px 12px',
        borderRadius: 20,
        backgroundColor: 'rgba(238,77,45,0.15)',
        border: '1px solid rgba(238,77,45,0.3)',
        fontSize: 11,
        fontWeight: 600,
        color: 'var(--accent)',
        letterSpacing: '0.5px',
      }}>
        ✓ Sudah termasuk semua biaya
      </div>
    </div>
  );
}
