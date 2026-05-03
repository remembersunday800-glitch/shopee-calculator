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
      className="p-4 lg:p-6"
    >
      <div className="lg:grid lg:grid-cols-2 lg:gap-6">
        <div>
          <h2 className="text-base font-semibold mb-2" style={{ color: '#FFFFFF' }}>
            Simulasi Harga Kompetitif
          </h2>
          <p className="text-sm mb-4" style={{ color: '#A0A0A0' }}>
            Masukkan harga jual yang ingin kamu simulasikan untuk melihat margin keuntungan yang akan diperoleh.
          </p>
          <InputField
            id="hargaTarget"
            label="Harga Target"
            value={hargaTarget}
            onChange={handleHargaTargetChange}
            satuan="rupiah"
            error={error}
            placeholder="Masukkan harga target"
          />
        </div>
        <div className="mt-6 lg:mt-0">
          <h2 className="text-base font-semibold mb-4" style={{ color: '#FFFFFF' }}>
            Hasil Simulasi
          </h2>
          <HasilSimulasi hasil={hasil} />
        </div>
      </div>
    </div>
  );
}
