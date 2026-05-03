import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'shopee-kalkulator-config';
const DEFAULT_BIAYA_PLATFORM = 9;
const DEFAULT_BIAYA_PENANGANAN = 1250;

const defaultKonfigurasi = {
  kategoriId: null,
  tierToko: 'non-star',
  biayaPlatformOverride: null,
  biayaPenangananCustom: DEFAULT_BIAYA_PENANGANAN,
};

export function useKonfigurasi() {
  const [kategori, setKategori] = useState([]);
  const [loadingKategori, setLoadingKategori] = useState(true);
  const [errorKategori, setErrorKategori] = useState(null);
  const [konfigurasi, setKonfigurasi] = useState(() => {
    try {
      const tersimpan = localStorage.getItem(STORAGE_KEY);
      if (tersimpan) {
        return { ...defaultKonfigurasi, ...JSON.parse(tersimpan) };
      }
    } catch {
      // fallback ke default jika data korup
    }
    return defaultKonfigurasi;
  });

  // Muat categories.json
  useEffect(() => {
    async function muatKategori() {
      try {
        setLoadingKategori(true);
        const response = await fetch(import.meta.env.BASE_URL + 'data/categories.json');
        if (!response.ok) throw new Error('Gagal memuat data kategori');
        const data = await response.json();
        setKategori(data.categories || []);
        setErrorKategori(null);
      } catch (err) {
        setErrorKategori('Gagal memuat data kategori. Menggunakan nilai default.');
        setKategori([]);
      } finally {
        setLoadingKategori(false);
      }
    }
    muatKategori();
  }, []);

  // Simpan ke localStorage setiap kali konfigurasi berubah
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(konfigurasi));
    } catch {
      // ignore storage errors
    }
  }, [konfigurasi]);

  // Hitung biayaPlatform aktif berdasarkan konfigurasi
  const biayaPlatformAktif = konfigurasi.biayaPlatformOverride !== null
    ? konfigurasi.biayaPlatformOverride
    : DEFAULT_BIAYA_PLATFORM;

  const setBiayaDariKategori = useCallback((kategoriId, tierToko) => {
    const cat = kategori.find(c => c.id === kategoriId);
    const biaya = cat ? cat.biaya[tierToko] ?? DEFAULT_BIAYA_PLATFORM : DEFAULT_BIAYA_PLATFORM;
    setKonfigurasi(prev => ({
      ...prev,
      kategoriId,
      tierToko,
      biayaPlatformOverride: biaya,
    }));
  }, [kategori]);

  const setTierToko = useCallback((tierToko) => {
    setKonfigurasi(prev => {
      const cat = kategori.find(c => c.id === prev.kategoriId);
      const biaya = cat ? cat.biaya[tierToko] ?? DEFAULT_BIAYA_PLATFORM : DEFAULT_BIAYA_PLATFORM;
      return {
        ...prev,
        tierToko,
        biayaPlatformOverride: prev.kategoriId ? biaya : prev.biayaPlatformOverride,
      };
    });
  }, [kategori]);

  const setBiayaPenangananCustom = useCallback((nilai) => {
    setKonfigurasi(prev => ({ ...prev, biayaPenangananCustom: nilai }));
  }, []);

  const setBiayaPlatformManual = useCallback((nilai) => {
    setKonfigurasi(prev => ({ ...prev, biayaPlatformOverride: nilai }));
  }, []);

  return {
    kategori,
    loadingKategori,
    errorKategori,
    konfigurasi,
    biayaPlatformAktif,
    setBiayaDariKategori,
    setTierToko,
    setBiayaPenangananCustom,
    setBiayaPlatformManual,
  };
}
