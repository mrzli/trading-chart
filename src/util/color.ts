import { Rgb } from '../types';

export function hexToRgb(hex: string): Rgb {
  hex = hex.startsWith('#') ? hex.slice(1) : hex;

  const bigint = Number.parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

export function hexToRgba(hex: string, alpha: number): Rgb & { a: number } {
  const { r, g, b } = hexToRgb(hex);
  return { r, g, b, a: alpha };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const rHex = componentToHex(r);
  const gHex = componentToHex(g);
  const bHex = componentToHex(b);

  return `#${rHex}${gHex}${bHex}`;
}

function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}
