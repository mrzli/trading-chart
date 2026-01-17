import { describe, expect, it } from 'bun:test';
import {
  renderBackground,
  RenderBackgroundInput,
} from '@/chart/renderers';
import { DrawItem, DrawPathCommand } from '@/types';

describe('background', () => {
  describe('renderBackground()', () => {
    interface Example {
      readonly input: RenderBackgroundInput;
      readonly expected: readonly DrawItem[];
    }

    const makeExpected = (
      input: RenderBackgroundInput,
    ): readonly DrawItem[] => {
      const { size, color } = input;
      const { width, height } = size;
      const rectCommand: DrawPathCommand = {
        kind: 'rect',
        x: 0,
        y: 0,
        width,
        height,
      };

      const batch: readonly DrawItem[] = [
        {
          kind: 'batch',
          clipPath: [rectCommand],
          style: {
            fillStrokeStyle: { fillStyle: color },
          },
          items: [
            {
              kind: 'path',
              operation: 'fill',
              commands: [rectCommand],
            },
          ],
        },
      ];

      return batch;
    };

    const EXAMPLES: readonly Example[] = [
      {
        input: { size: { width: 0, height: 0 }, color: '#000000' },
        expected: makeExpected({
          size: { width: 0, height: 0 },
          color: '#000000',
        }),
      },
      {
        input: { size: { width: 100, height: 50 }, color: 'red' },
        expected: makeExpected({
          size: { width: 100, height: 50 },
          color: 'red',
        }),
      },
      {
        input: {
          size: { width: 200, height: 123 },
          color: 'rgba(10, 20, 30, 0.5)',
        },
        expected: makeExpected({
          size: { width: 200, height: 123 },
          color: 'rgba(10, 20, 30, 0.5)',
        }),
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example.input), () => {
        const actual = renderBackground(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
