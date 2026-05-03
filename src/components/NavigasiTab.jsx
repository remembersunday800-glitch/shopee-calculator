import { useRef, useCallback } from 'react';

const TABS = [
  { id: 'kalkulator', label: 'Kalkulator' },
  { id: 'simulasi', label: 'Simulasi' },
  { id: 'konfigurasi', label: 'Konfigurasi' },
];

export default function NavigasiTab({ tabAktif, onGantiTab }) {
  const tabRefs = useRef({});

  const handleKeyDown = useCallback((e, currentIndex) => {
    let nextIndex;
    if (e.key === 'ArrowRight') nextIndex = (currentIndex + 1) % TABS.length;
    else if (e.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + TABS.length) % TABS.length;
    else return;
    e.preventDefault();
    const nextTab = TABS[nextIndex];
    onGantiTab(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  }, [onGantiTab]);

  return (
    <div
      role="tablist"
      aria-label="Navigasi kalkulator"
      style={{
        display: 'flex',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px',
        gap: 4,
      }}
    >
      {TABS.map((tab, index) => {
        const isActive = tabAktif === tab.id;
        return (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[tab.id] = el; }}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onGantiTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              background: 'none',
              border: 'none',
              padding: '16px 20px',
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer',
              position: 'relative',
              transition: 'color 0.2s',
              borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
              marginBottom: -1,
              letterSpacing: '-0.1px',
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
