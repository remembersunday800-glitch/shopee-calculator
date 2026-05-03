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
            {/* TCON Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Logo icon TCON — T kuning + biru */}
              <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="12" fill="#0D0D0D"/>
                {/* T biru kiri */}
                <path d="M18 28 Q18 22 24 22 L32 22 Q32 28 32 34 L32 72 Q32 78 26 78 Q20 78 20 72 L20 34 Z" fill="#1B3A8C"/>
                {/* T kuning kanan */}
                <path d="M28 22 L72 22 Q78 22 78 28 Q78 34 72 34 L54 34 L54 72 Q54 78 48 78 Q42 78 42 72 L42 34 L28 34 Z" fill="#F5C800"/>
              </svg>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>TCON</span>
                  <span style={{ fontSize: 10, fontWeight: 400, color: 'var(--text-secondary)' }}>Digital</span>
                </div>
                <p style={{ margin: 0, fontSize: 11, color: 'var(--text-secondary)', fontWeight: 400 }}>
                  Kalkulator Harga Jual Shopee
                </p>
              </div>
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
      <footer style={{ marginTop: 60, paddingBottom: 40, borderTop: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto px-6 py-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          {/* Logo TCON */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" rx="12" fill="#111"/>
              <path d="M18 28 Q18 22 24 22 L32 22 Q32 28 32 34 L32 72 Q32 78 26 78 Q20 78 20 72 L20 34 Z" fill="#1B3A8C"/>
              <path d="M28 22 L72 22 Q78 22 78 28 Q78 34 72 34 L54 34 L54 72 Q54 78 48 78 Q42 78 42 72 L42 34 L28 34 Z" fill="#F5C800"/>
            </svg>
            <div>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>TCON</span>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)', marginLeft: 4 }}>Digital Marketing Agency</span>
            </div>
          </div>

          {/* Credit */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 4px', fontSize: 12, color: 'var(--text-secondary)' }}>
              Dibuat oleh <span style={{ color: '#fff', fontWeight: 600 }}>David Fanani</span> · TCON Digital Marketing Agency
            </p>
            <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>
              Data biaya platform mengacu pada struktur biaya Shopee Indonesia per April 2026
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <a
              href="https://www.tcondigma.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 12, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              tcondigma.com
            </a>
            <span style={{ color: 'var(--border)', fontSize: 12 }}>·</span>
            <a
              href="https://www.instagram.com/tcon.agency"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 12, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              @tcon.agency
            </a>
            <span style={{ color: 'var(--border)', fontSize: 12 }}>·</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
