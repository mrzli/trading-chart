import { expect, describe, it } from 'vitest';
import { measureTextHeight, measureTextWidth } from './measure-text-new';

const FONT_SANS_SERIF = 'sans-serif';
const FONT_COURIER_NEW = 'Courier New';

describe('measure-text', () => {
  describe('measureTextWidth()', () => {
    interface Example {
      readonly description: string;
      readonly input: {
        readonly fontFamily: string;
        readonly fontSize: number;
        readonly text: string;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        description: 'empty string',
        input: {
          fontFamily: FONT_SANS_SERIF,
          fontSize: 12,
          text: '',
        },
        expected: 0,
      },
      {
        description: 'propotional font, single character A',
        input: {
          fontFamily: FONT_SANS_SERIF,
          fontSize: 12,
          text: 'A',
        },
        expected: 8,
      },
      {
        description: 'propotional font, single character V',
        input: {
          fontFamily: FONT_SANS_SERIF,
          fontSize: 12,
          text: 'V',
        },
        expected: 8,
      },
      {
        description: 'propotional font, multiple identical characters',
        input: {
          fontFamily: FONT_SANS_SERIF,
          fontSize: 12,
          text: 'AA',
        },
        expected: 16,
      },
      {
        description: 'propotional font, different characters',
        input: {
          fontFamily: FONT_SANS_SERIF,
          fontSize: 12,
          text: 'AVA',
        },
        expected: 22,
      },
      {
        description: 'propotional font, non-specified character',
        input: {
          fontFamily: FONT_SANS_SERIF,
          fontSize: 12,
          text: '§',
        },
        expected: 7,
      },
      {
        description: 'monospaced font 1',
        input: {
          fontFamily: FONT_COURIER_NEW,
          fontSize: 12,
          text: 'A',
        },
        expected: 7,
      },
      {
        description: 'monospaced font 2',
        input: {
          fontFamily: FONT_COURIER_NEW,
          fontSize: 12,
          text: 'AVA',
        },
        expected: 22,
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const { fontFamily, fontSize, text } = example.input;
        const actual = measureTextWidth(fontFamily, fontSize, text);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('measureTextHeight()', () => {
    interface Example {
      readonly description: string;
      readonly input: {
        readonly fontFamily: string;
        readonly fontSize: number;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        description: 'sans-serif, font 12',
        input: {
          fontFamily: FONT_SANS_SERIF,
          fontSize: 12,
        },
        expected: 14,
      },
      {
        description: 'sans-serif, font 1000',
        input: {
          fontFamily: FONT_SANS_SERIF,
          fontSize: 1000,
        },
        expected: 1150,
      },
      {
        description: 'Courier New, font 12',
        input: {
          fontFamily: FONT_COURIER_NEW,
          fontSize: 12,
        },
        expected: 14,
      },
      {
        description: 'Courier New, font 1000',
        input: {
          fontFamily: FONT_COURIER_NEW,
          fontSize: 1000,
        },
        expected: 1133,
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const { fontFamily, fontSize } = example.input;
        const actual = measureTextHeight(fontFamily, fontSize);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
