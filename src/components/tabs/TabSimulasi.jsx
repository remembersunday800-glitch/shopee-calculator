import { useSimulasi } from '../../hooks/useSimulasi.js';
import InputField from '../InputField.jsx';
import HasilSimulasi from '../hasil/HasilSimulasi.jsx';

export default function TabSimulasi({ inputBiaya }) {
  const { hargaTarget, hasil, error, handleHargaTargetChange } = useSimulasi(inputBiaya);

  return (
    <div
      id="panel-simulasi"
      role="tabpanel"
      aria-labelledby="tab-simulasi"
      style={{ padding: '32px 24px' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}
        className="lg:grid-cols-2">
        <div>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
              Simulasi Harga
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
              Cek margin keuntungan untuk harga kompetitif tertentu
            </p>
          </div>

          {/* Info card */}
          <div style={{
            padding: '14px 16px',
            borderRadius: 12,
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            marginBottom: 20,
          }}>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              💡 Simulasi menggunakan data biaya dari tab Kalkulator. Pastikan data produk sudah diisi terlebih dahulu.
            </p>
          </div>

          <InputField
            id="hargaTarget"
            label="Harga Target"
            value={hargaTarget}
            onChange={handleHargaTargetChange}
            satuan="rupiah"
            error={error}
            placeholder="Masukkan harga yang ingin disimulasikan"
          />
        </div>

        <div>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
              Hasil Simulasi
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
              Analisis margin untuk harga yang kamu masukkan
            </p>
          </div>
          <HasilSimulasi hasil={hasil} />
        </div>
      </div>
    </div>
  );
}
