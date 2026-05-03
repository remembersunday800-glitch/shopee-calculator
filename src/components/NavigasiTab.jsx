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
    <div role="tablist" aria-label="Navigasi kalkulator" className="flex border-b" style={{ borderColor: '#2A2A2A' }}>
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
            className="px-5 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#EE4D2D]"
            style={{
              color: isActive ? '#EE4D2D' : '#A0A0A0',
              borderBottom: isActive ? '2px solid #EE4D2D' : '2px solid transparent',
              backgroundColor: 'transparent',
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
