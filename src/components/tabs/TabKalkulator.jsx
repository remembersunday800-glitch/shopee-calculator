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
      style={{ padding: '32px 24px' }}
    >
      {/* Error kombinasi */}
      {errors.kombinasi && (
        <div style={{
          marginBottom: 20,
          padding: '12px 16px',
          borderRadius: 10,
          backgroundColor: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.3)',
          fontSize: 13,
          color: 'var(--error)',
        }}>
          {errors.kombinasi}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}
        className="lg:grid-cols-2">
        {/* Form */}
        <div>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
              Data Produk
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
              Isi komponen biaya untuk menghitung harga jual optimal
            </p>
          </div>

          <InputField id="hargaModal" label="Harga Modal" value={input.hargaModal} onChange={(v) => handleChange('hargaModal', v)} satuan="rupiah" error={errors.hargaModal} placeholder="0" />
          <InputField id="biayaTambahan" label="Biaya Tambahan (kemasan, dll)" value={input.biayaTambahan} onChange={(v) => handleChange('biayaTambahan', v)} satuan="rupiah" error={errors.biayaTambahan} placeholder="0" />
          <InputField id="biayaPengiriman" label="Biaya Pengiriman" value={input.biayaPengiriman} onChange={(v) => handleChange('biayaPengiriman', v)} satuan="rupiah" error={errors.biayaPengiriman} placeholder="0" />
          <InputField id="biayaPenanganan" label="Biaya Penanganan Pesanan" value={input.biayaPenanganan} onChange={(v) => handleChange('biayaPenanganan', v)} satuan="rupiah" error={errors.biayaPenanganan} placeholder="1250" />

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: 'var(--border)', margin: '8px 0 16px' }} />

          <InputField id="targetKeuntungan" label="Target Keuntungan" value={input.targetKeuntungan} onChange={(v) => handleChange('targetKeuntungan', v)} satuan="persen" error={errors.targetKeuntungan} placeholder="0" min={0} />
          <InputField id="biayaPlatform" label="Biaya Platform Shopee" value={input.biayaPlatform} onChange={(v) => handleChange('biayaPlatform', v)} satuan="persen" error={errors.biayaPlatform} placeholder="9" min={0} />

          <div style={{ marginTop: 8 }}>
            <TombolReset onClick={() => reset(biayaPlatformDariKonfigurasi)} />
          </div>
        </div>

        {/* Hasil */}
        <div>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
              Hasil Kalkulasi
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
              Harga jual yang menjamin target keuntunganmu
            </p>
          </div>
          <HasilKalkulasi hasil={hasil} input={input} />
        </div>
      </div>
    </div>
  );
}
