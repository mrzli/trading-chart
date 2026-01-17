import { describe, expect, it } from 'bun:test';
import { renderBarSeries, RenderBarSeriesInput } from '@/chart/renderers';
import { DrawItem, Rect } from '@/types';

describe('bar-series', () => {
  describe('renderBarSeries()', () => {
    it('renders grouped bars with computed widths', () => {
      const area: Rect = { x: 0, y: 0, width: 100, height: 50 };
      const input: RenderBarSeriesInput = {
        area,
        itemWidth: 10,
        items: [
          { xItem: 0, y1: 2, y2: 8, color: 'red' },
          { xItem: 10, y1: 1, y2: 4, color: 'red' },
        ],
      };

      const barWidth = 7;
      const barXOffset = 1;

      const expected: readonly DrawItem[] = [
        {
          kind: 'batch',
          clipPath: [{ kind: 'rect', ...area }],
          items: [
            {
              kind: 'batch',
              clipPath: undefined,
              style: {
                fillStrokeStyle: {
                  fillStyle: 'red',
                },
              },
              items: [
                {
                  kind: 'path',
                  operation: 'fill',
                  commands: [
                    {
                      kind: 'rect',
                      x: area.x + 0 + barXOffset,
                      y: area.y + 2,
                      width: barWidth,
                      height: 6,
                    },
                    {
                      kind: 'rect',
                      x: area.x + 10 + barXOffset,
                      y: area.y + 1,
                      width: barWidth,
                      height: 3,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];

      const actual = renderBarSeries(input);
      expect(actual).toEqual(expected);
    });
  });
});
