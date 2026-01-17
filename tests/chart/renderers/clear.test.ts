import { describe, expect, it } from 'bun:test';
import { renderClear, RenderClearInput } from '@/chart/renderers';
import { DrawItem } from '@/types';

describe('clear', () => {
  describe('renderClear()', () => {
    interface Example {
      readonly input: RenderClearInput;
      readonly expected: readonly DrawItem[];
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: { size: { width: 0, height: 0 } },
        expected: makeExpected({ size: { width: 0, height: 0 } }),
      },
      {
        input: { size: { width: 120, height: 45 } },
        expected: makeExpected({ size: { width: 120, height: 45 } }),
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example.input), () => {
        const actual = renderClear(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});

function makeExpected(input: RenderClearInput): readonly DrawItem[] {
  const { width, height } = input.size;

  return [
    {
      kind: 'clear',
      area: {
        x: 0,
        y: 0,
        width,
        height,
      },
    },
  ];
}
