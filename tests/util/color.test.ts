import { describe, expect, it } from 'bun:test';
import { Rgb, Rgba } from '@/types';
import {
  hexToRgb,
  hexToRgba,
  rgbToHex,
  rgbToString,
  rgbaToString,
} from '@/util';

describe('color', () => {
  describe('hexToRgb()', () => {
    interface Example {
      readonly input: string;
      readonly expected: Rgb;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: '#000000',
        expected: { r: 0, g: 0, b: 0 },
      },
      {
        input: '000000',
        expected: { r: 0, g: 0, b: 0 },
      },
      {
        input: '#FFFFFF',
        expected: { r: 255, g: 255, b: 255 },
      },
      {
        input: 'FFFFFF',
        expected: { r: 255, g: 255, b: 255 },
      },
      {
        input: '#FF0000',
        expected: { r: 255, g: 0, b: 0 },
      },
      {
        input: '#00FF00',
        expected: { r: 0, g: 255, b: 0 },
      },
      {
        input: '#0000FF',
        expected: { r: 0, g: 0, b: 255 },
      },
      {
        input: '#123456',
        expected: { r: 18, g: 52, b: 86 },
      },
      {
        input: '#ABCDEF',
        expected: { r: 171, g: 205, b: 239 },
      },
      {
        input: '#abcdef',
        expected: { r: 171, g: 205, b: 239 },
      },
    ];

    for (const example of EXAMPLES) {
      it(example.input, () => {
        const actual = hexToRgb(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('hexToRgba()', () => {
    interface Example {
      readonly input: {
        readonly hex: string;
        readonly alpha: number;
      };
      readonly expected: Rgba;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: { hex: '#000000', alpha: 0 },
        expected: { r: 0, g: 0, b: 0, a: 0 },
      },
      {
        input: { hex: '#000000', alpha: 1 },
        expected: { r: 0, g: 0, b: 0, a: 1 },
      },
      {
        input: { hex: '#FFFFFF', alpha: 0.5 },
        expected: { r: 255, g: 255, b: 255, a: 0.5 },
      },
      {
        input: { hex: 'FF0000', alpha: 0.8 },
        expected: { r: 255, g: 0, b: 0, a: 0.8 },
      },
      {
        input: { hex: '#123456', alpha: 0.25 },
        expected: { r: 18, g: 52, b: 86, a: 0.25 },
      },
    ];

    for (const example of EXAMPLES) {
      it(`${example.input.hex}, ${example.input.alpha}`, () => {
        const actual = hexToRgba(example.input.hex, example.input.alpha);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('rgbToHex()', () => {
    interface Example {
      readonly input: Rgb;
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: { r: 0, g: 0, b: 0 },
        expected: '#000000',
      },
      {
        input: { r: 255, g: 255, b: 255 },
        expected: '#ffffff',
      },
      {
        input: { r: 255, g: 0, b: 0 },
        expected: '#ff0000',
      },
      {
        input: { r: 0, g: 255, b: 0 },
        expected: '#00ff00',
      },
      {
        input: { r: 0, g: 0, b: 255 },
        expected: '#0000ff',
      },
      {
        input: { r: 18, g: 52, b: 86 },
        expected: '#123456',
      },
      {
        input: { r: 171, g: 205, b: 239 },
        expected: '#abcdef',
      },
      {
        input: { r: 1, g: 2, b: 3 },
        expected: '#010203',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example.input), () => {
        const actual = rgbToHex(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('rgbToString()', () => {
    interface Example {
      readonly input: Rgb;
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: { r: 0, g: 0, b: 0 },
        expected: 'rgb(0, 0, 0)',
      },
      {
        input: { r: 255, g: 255, b: 255 },
        expected: 'rgb(255, 255, 255)',
      },
      {
        input: { r: 255, g: 0, b: 0 },
        expected: 'rgb(255, 0, 0)',
      },
      {
        input: { r: 0, g: 255, b: 0 },
        expected: 'rgb(0, 255, 0)',
      },
      {
        input: { r: 0, g: 0, b: 255 },
        expected: 'rgb(0, 0, 255)',
      },
      {
        input: { r: 18, g: 52, b: 86 },
        expected: 'rgb(18, 52, 86)',
      },
      {
        input: { r: 171, g: 205, b: 239 },
        expected: 'rgb(171, 205, 239)',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example.input), () => {
        const actual = rgbToString(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('rgbaToString()', () => {
    interface Example {
      readonly input: Rgba;
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: { r: 0, g: 0, b: 0, a: 0 },
        expected: 'rgba(0, 0, 0, 0)',
      },
      {
        input: { r: 0, g: 0, b: 0, a: 1 },
        expected: 'rgba(0, 0, 0, 1)',
      },
      {
        input: { r: 255, g: 255, b: 255, a: 0.5 },
        expected: 'rgba(255, 255, 255, 0.5)',
      },
      {
        input: { r: 255, g: 0, b: 0, a: 0.8 },
        expected: 'rgba(255, 0, 0, 0.8)',
      },
      {
        input: { r: 0, g: 255, b: 0, a: 0.25 },
        expected: 'rgba(0, 255, 0, 0.25)',
      },
      {
        input: { r: 18, g: 52, b: 86, a: 0.75 },
        expected: 'rgba(18, 52, 86, 0.75)',
      },
      {
        input: { r: 171, g: 205, b: 239, a: 0.1 },
        expected: 'rgba(171, 205, 239, 0.1)',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example.input), () => {
        const actual = rgbaToString(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('round-trip conversions', () => {
    interface Example {
      readonly hex: string;
    }

    const EXAMPLES: readonly Example[] = [
      { hex: '#000000' },
      { hex: '#FFFFFF' },
      { hex: '#FF0000' },
      { hex: '#00FF00' },
      { hex: '#0000FF' },
      { hex: '#123456' },
      { hex: '#ABCDEF' },
    ];

    for (const example of EXAMPLES) {
      it(`hex -> rgb -> hex: ${example.hex}`, () => {
        const rgb = hexToRgb(example.hex);
        const actual = rgbToHex(rgb);
        expect(actual).toEqual(example.hex.toLowerCase());
      });
    }
  });
});
