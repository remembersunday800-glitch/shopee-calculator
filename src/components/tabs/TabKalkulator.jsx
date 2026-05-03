import { useKalkulator } from '../../hooks/useKalkulator.js';
import InputField from '../InputField.jsx';
import TombolReset from '../TombolReset.jsx';
import HasilKalkulasi from '../hasil/HasilKalkulasi.jsx';

export default function TabKalkulator({ biayaPlatformDariKonfigurasi, biayaPenangananDariKonfigurasi }) {
  const { input, errors, hasil, handleChange, reset } = useKalkulator(
    biayaPlatformDariKonfigurasi,
    biayaPenangananDariKonfigurasi
  );

  return (
    <div
      id="panel-kalkulator"
      role="tabpanel"
      aria-labelledby="tab-kalkulator"
      className="p-4 lg:p-6"
    >
      <div className="lg:grid lg:grid-cols-2 lg:gap-6">
        {/* Form Input */}
        <div>
          <h2 className="text-base font-semibold mb-4" style={{ color: '#FFFFFF' }}>
            Data Produk
          </h2>
          {errors.kombinasi && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid #EF4444', color: '#EF4444' }}>
              {errors.kombinasi}
            </div>
          )}
          <InputField
            id="hargaModal"
            label="Harga Modal"
            value={input.hargaModal}
            onChange={(v) => handleChange('hargaModal', v)}
            satuan="rupiah"
            error={errors.hargaModal}
            placeholder="0"
          />
          <InputField
            id="biayaTambahan"
            label="Biaya Tambahan (kemasan, dll)"
            value={input.biayaTambahan}
            onChange={(v) => handleChange('biayaTambahan', v)}
            satuan="rupiah"
            error={errors.biayaTambahan}
            placeholder="0"
          />
          <InputField
            id="biayaPengiriman"
            label="Biaya Pengiriman (ditanggung penjual)"
            value={input.biayaPengiriman}
            onChange={(v) => handleChange('biayaPengiriman', v)}
            satuan="rupiah"
            error={errors.biayaPengiriman}
            placeholder="0"
          />
          <InputField
            id="biayaPenanganan"
            label="Biaya Penanganan Pesanan"
            value={input.biayaPenanganan}
            onChange={(v) => handleChange('biayaPenanganan', v)}
            satuan="rupiah"
            error={errors.biayaPenanganan}
            placeholder="1250"
          />
          <InputField
            id="targetKeuntungan"
            label="Target Keuntungan"
            value={input.targetKeuntungan}
            onChange={(v) => handleChange('targetKeuntungan', v)}
            satuan="persen"
            error={errors.targetKeuntungan}
            placeholder="0"
            min={0}
          />
          <InputField
            id="biayaPlatform"
            label="Biaya Platform Shopee"
            value={input.biayaPlatform}
            onChange={(v) => handleChange('biayaPlatform', v)}
            satuan="persen"
            error={errors.biayaPlatform}
            placeholder="9"
            min={0}
          />
          <div className="mt-2">
            <TombolReset onClick={() => reset(biayaPlatformDariKonfigurasi)} />
          </div>
        </div>
        {/* Hasil */}
        <div className="mt-6 lg:mt-0">
          <h2 className="text-base font-semibold mb-4" style={{ color: '#FFFFFF' }}>
            Hasil Kalkulasi
          </h2>
          <HasilKalkulasi hasil={hasil} input={input} />
        </div>
      </div>
    </div>
  );
}
