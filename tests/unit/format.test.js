import { describe, test, expect } from 'vitest';
import { formatRupiah, formatPersen } from '../../src/utils/format.js';

describe('formatRupiah', () => {
  test('format angka 0', () => expect(formatRupiah(0)).toBe('Rp 0'));
  test('format angka 1500000', () => expect(formatRupiah(1500000)).toBe('Rp 1.500.000'));
  test('format angka 150000', () => expect(formatRupiah(150000)).toBe('Rp 150.000'));
  test('format angka 1000', () => expect(formatRupiah(1000)).toBe('Rp 1.000'));
  test('format angka 999', () => expect(formatRupiah(999)).toBe('Rp 999'));
  test('handle null', () => expect(formatRupiah(null)).toBe('Rp 0'));
  test('handle NaN', () => expect(formatRupiah(NaN)).toBe('Rp 0'));
  test('handle undefined', () => expect(formatRupiah(undefined)).toBe('Rp 0'));
  test('format angka desimal dibulatkan', () => expect(formatRupiah(1500.7)).toBe('Rp 1.501'));
});

describe('formatPersen', () => {
  test('format 6.5', () => expect(formatPersen(6.5)).toBe('6.50%'));
  test('format 0', () => expect(formatPersen(0)).toBe('0.00%'));
  test('format 100', () => expect(formatPersen(100)).toBe('100.00%'));
  test('format 9.99', () => expect(formatPersen(9.99)).toBe('9.99%'));
  test('format dengan desimal custom', () => expect(formatPersen(6.5, 1)).toBe('6.5%'));
  test('handle null', () => expect(formatPersen(null)).toBe('0.00%'));
  test('handle NaN', () => expect(formatPersen(NaN)).toBe('0.00%'));
});
