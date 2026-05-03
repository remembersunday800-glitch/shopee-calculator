import { useState, useCallback } from 'react';
import NavigasiTab from './components/NavigasiTab.jsx';
import TabKalkulator from './components/tabs/TabKalkulator.jsx';
import TabSimulasi from './components/tabs/TabSimulasi.jsx';
import TabKonfigurasi from './components/tabs/TabKonfigurasi.jsx';
import { useKonfigurasi } from './hooks/useKonfigurasi.js';
import { useKalkulator } from './hooks/useKalkulator.js';

export default function App() {
  const [tabAktif, setTabAktif] = useState('kalkulator');
  const { konfigurasi, biayaPlatformAktif } = useKonfigurasi();
  const { input } = useKalkulator(biayaPlatformAktif, konfigurasi.biayaPenangananCustom);
  const handleGantiTab = useCallback((tabId) => setTabAktif(tabId), []);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <header style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'rgba(8,8,8,0.8)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #EE4D2D 0%, #FF6B47 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 16, color: '#fff',
              boxShadow: '0 4px 15px rgba(238,77,45,0.4)'
            }}>S</div>
            <div>
              <h1 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>
                Kalkulator Harga Jual
              </h1>
              <p style={{ margin: 0, fontSize: 11, color: 'var(--text-secondary)', fontWeight: 400 }}>
                Shopee Indonesia
              </p>
            </div>
          </div>
          <div style={{
            fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)',
            padding: '4px 10px', borderRadius: 20,
            border: '1px solid var(--border)',
            backgroundColor: 'var(--bg-card)',
            letterSpacing: '0.5px'
          }}>
            2026
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        <NavigasiTab tabAktif={tabAktif} onGantiTab={handleGantiTab} />

        <div style={{ display: tabAktif === 'kalkulator' ? 'block' : 'none' }} aria-hidden={tabAktif !== 'kalkulator'}>
          <TabKalkulator
            biayaPlatformDariKonfigurasi={biayaPlatformAktif}
            biayaPenangananDariKonfigurasi={konfigurasi.biayaPenangananCustom}
          />
        </div>
        <div style={{ display: tabAktif === 'simulasi' ? 'block' : 'none' }} aria-hidden={tabAktif !== 'simulasi'}>
          <TabSimulasi inputBiaya={input} />
        </div>
        <div style={{ display: tabAktif === 'konfigurasi' ? 'block' : 'none' }} aria-hidden={tabAktif !== 'konfigurasi'}>
          <TabKonfigurasi onKonfigurasiChange={() => {}} />
        </div>
      </main>

      {/* Footer */}
      <footer style={{ marginTop: 60, paddingBottom: 32, textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>
          Data biaya platform mengacu pada struktur biaya Shopee Indonesia per April 2026
        </p>
      </footer>
    </div>
  );
}
