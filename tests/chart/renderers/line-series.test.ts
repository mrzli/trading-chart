import { describe, expect, it } from 'bun:test';
import { renderLineSeries, RenderLineSeriesInput } from '@/chart/renderers';
import { DrawItem, DrawPathCommand, Rect } from '@/types';

describe('line-series', () => {
  describe('renderLineSeries()', () => {
    const area: Rect = { x: 0, y: 0, width: 100, height: 50 };

    it('returns empty commands for one item', () => {
      const input: RenderLineSeriesInput = {
        area,
        color: '#ff0000',
        items: [{ x: 10, y: 20 }],
      };

      const actual = renderLineSeries(input);

      const expected = makeExpected(area, '#ff0000', []);

      expect(actual).toEqual(expected);
    });

    it('renders a polyline for multiple items', () => {
      const input: RenderLineSeriesInput = {
        area,
        color: '#00aa00',
        items: [
          { x: 5, y: 10 },
          { x: 15, y: 20 },
          { x: 25, y: 5 },
        ],
      };

      const actual = renderLineSeries(input);

      const commands: readonly DrawPathCommand[] = [
        { kind: 'move-to', x: 5, y: 10 },
        { kind: 'line-to', x: 15, y: 20 },
        { kind: 'line-to', x: 25, y: 5 },
      ];

      const expected = makeExpected(area, '#00aa00', commands);

      expect(actual).toEqual(expected);
    });
  });
});

function makeExpected(
  area: Rect,
  color: string,
  commands: readonly DrawPathCommand[],
): readonly DrawItem[] {
  return [
    {
      kind: 'batch',
      clipPath: [{ kind: 'rect', ...area }],
      style: {
        fillStrokeStyle: {
          strokeStyle: color,
        },
      },
      items: [
        {
          kind: 'path',
          operation: 'stroke',
          commands,
        },
      ],
    },
  ];
}
