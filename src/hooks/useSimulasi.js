import { useState, useEffect, useCallback } from 'react';
import { validasiHargaTarget } from '../utils/validasi.js';
import { simulasiMargin } from '../utils/simulasi.js';

export function useSimulasi(inputBiaya) {
  const [hargaTarget, setHargaTarget] = useState('');
  const [hasil, setHasil] = useState(null);
  const [error, setError] = useState('');

  // Hitung simulasi setiap kali hargaTarget atau inputBiaya berubah
  useEffect(() => {
    if (hargaTarget === '' || hargaTarget === null) {
      setHasil(null);
      setError('');
      return;
    }

    const errMsg = validasiHargaTarget(hargaTarget);
    setError(errMsg);

    if (!errMsg) {
      const target = parseFloat(hargaTarget);
      setHasil(simulasiMargin(target, inputBiaya));
    } else {
      setHasil(null);
    }
  }, [hargaTarget, inputBiaya]);

  const handleHargaTargetChange = useCallback((value) => {
    setHargaTarget(value);
  }, []);

  const resetSimulasi = useCallback(() => {
    setHargaTarget('');
    setHasil(null);
    setError('');
  }, []);

  return { hargaTarget, hasil, error, handleHargaTargetChange, resetSimulasi };
}
