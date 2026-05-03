import { useState, useEffect, useCallback } from 'react';
import { validasiInput, adaError } from '../utils/validasi.js';
import { kalkulasiHarga } from '../utils/kalkulasi.js';

const DEFAULT_INPUT = {
  hargaModal: 0,
  biayaTambahan: 0,
  biayaPengiriman: 0,
  biayaPenanganan: 1250,
  targetKeuntungan: 0,
  biayaPlatform: 9,
};

export function useKalkulator(biayaPlatformDariKonfigurasi = null, biayaPenangananDariKonfigurasi = null) {
  const [input, setInput] = useState(() => ({
    ...DEFAULT_INPUT,
    biayaPlatform: biayaPlatformDariKonfigurasi ?? DEFAULT_INPUT.biayaPlatform,
    biayaPenanganan: biayaPenangananDariKonfigurasi ?? DEFAULT_INPUT.biayaPenanganan,
  }));
  const [errors, setErrors] = useState({});
  const [hasil, setHasil] = useState(null);

  // Sinkronisasi biayaPlatform dari konfigurasi
  useEffect(() => {
    if (biayaPlatformDariKonfigurasi !== null) {
      setInput(prev => ({ ...prev, biayaPlatform: biayaPlatformDariKonfigurasi }));
    }
  }, [biayaPlatformDariKonfigurasi]);

  // Sinkronisasi biayaPenanganan dari konfigurasi
  useEffect(() => {
    if (biayaPenangananDariKonfigurasi !== null) {
      setInput(prev => ({ ...prev, biayaPenanganan: biayaPenangananDariKonfigurasi }));
    }
  }, [biayaPenangananDariKonfigurasi]);

  // Kalkulasi otomatis setiap kali input berubah
  useEffect(() => {
    const errs = validasiInput(input);
    setErrors(errs);
    if (!adaError(errs)) {
      setHasil(kalkulasiHarga(input));
    } else {
      setHasil(null);
    }
  }, [input]);

  const handleChange = useCallback((field, value) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setInput(prev => ({
      ...prev,
      [field]: isNaN(numValue) ? prev[field] : numValue,
    }));
  }, []);

  const reset = useCallback((biayaPlatformTersimpan = null) => {
    setInput({
      ...DEFAULT_INPUT,
      biayaPlatform: biayaPlatformTersimpan ?? biayaPlatformDariKonfigurasi ?? DEFAULT_INPUT.biayaPlatform,
      biayaPenanganan: biayaPenangananDariKonfigurasi ?? DEFAULT_INPUT.biayaPenanganan,
    });
    setHasil(null);
    setErrors({});
  }, [biayaPlatformDariKonfigurasi, biayaPenangananDariKonfigurasi]);

  return { input, errors, hasil, handleChange, reset };
}
