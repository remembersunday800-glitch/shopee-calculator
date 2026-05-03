import { useState, useCallback } from 'react';
import NavigasiTab from './components/NavigasiTab.jsx';
import TabKalkulator from './components/tabs/TabKalkulator.jsx';
import TabSimulasi from './components/tabs/TabSimulasi.jsx';
import TabKonfigurasi from './components/tabs/TabKonfigurasi.jsx';
import { useKonfigurasi } from './hooks/useKonfigurasi.js';
import { useKalkulator } from './hooks/useKalkulator.js';

export default function App() {
  const [tabAktif, setTabAktif] = useState('kalkulator');

  // Satu instance konfigurasi di level App
  const { konfigurasi, biayaPlatformAktif } = useKonfigurasi();

  // Satu instance kalkulator di level App, disinkronkan dengan konfigurasi
  // Digunakan untuk meneruskan inputBiaya ke TabSimulasi
  const { input } = useKalkulator(
    biayaPlatformAktif,
    konfigurasi.biayaPenangananCustom
  );

  const handleGantiTab = useCallback((tabId) => {
    setTabAktif(tabId);
  }, []);

  return (
    <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: '#2A2A2A', backgroundColor: '#0D0D0D' }}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: '#EE4D2D', color: '#FFFFFF' }}
            >
              S
            </div>
            <div>
              <h1 className="text-sm font-bold" style={{ color: '#FFFFFF' }}>
                Kalkulator Harga Jual
              </h1>
              <p className="text-xs" style={{ color: '#A0A0A0' }}>Shopee Indonesia</p>
            </div>
          </div>
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{ backgroundColor: '#1A1A1A', color: '#A0A0A0', border: '1px solid #2A2A2A' }}
          >
            2026
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto">
        <NavigasiTab tabAktif={tabAktif} onGantiTab={handleGantiTab} />

        {/* Tab panels — rendered tapi disembunyikan agar state tidak hilang saat ganti tab */}
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
      <footer className="mt-8 pb-6 text-center">
        <p className="text-xs" style={{ color: '#A0A0A0' }}>
          Data biaya platform mengacu pada struktur biaya Shopee Indonesia per April 2026
        </p>
      </footer>
    </div>
  );
}
