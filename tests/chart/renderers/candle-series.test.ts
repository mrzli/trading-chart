import { describe, expect, it } from 'bun:test';
import { renderCandleSeries, RenderCandleSeriesInput } from '@/chart/renderers';
import { DrawItem, Rect } from '@/types';

describe('candle-series', () => {
  describe('renderCandleSeries()', () => {
    it('renders degenerate candles when width is too small', () => {
      const area: Rect = { x: 0, y: 0, width: 100, height: 50 };
      const input: RenderCandleSeriesInput = {
        area,
        itemWidth: 2,
        items: [
          {
            xCenter: 10,
            y1: 2,
            y2: 2,
            y3: 2,
            y4: 3,
            color: 'green',
          },
        ],
      };

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
                  fillStyle: 'green',
                },
              },
              items: [
                {
                  kind: 'path',
                  operation: 'fill',
                  commands: [
                    { kind: 'move-to', x: 10, y: 2 },
                    { kind: 'line-to', x: 10, y: 3 },
                    { kind: 'line-to', x: 11, y: 3 },
                    { kind: 'line-to', x: 11, y: 2 },
                    { kind: 'line-to', x: 10, y: 2 },
                  ],
                },
              ],
            },
          ],
        },
      ];

      const actual = renderCandleSeries(input);
      expect(actual).toEqual(expected);
    });

    it('renders regular candles with wick and body', () => {
      const area: Rect = { x: 0, y: 0, width: 100, height: 50 };
      const input: RenderCandleSeriesInput = {
        area,
        itemWidth: 10,
        items: [
          {
            xCenter: 20,
            y1: 1,
            y2: 3,
            y3: 3,
            y4: 6,
            color: '#0055ff',
          },
        ],
      };

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
                  fillStyle: '#0055ff',
                },
              },
              items: [
                {
                  kind: 'path',
                  operation: 'fill',
                  commands: [
                    { kind: 'move-to', x: 20, y: 1 },
                    { kind: 'line-to', x: 20, y: 3 },
                    { kind: 'line-to', x: 17, y: 3 },
                    { kind: 'line-to', x: 17, y: 4 },
                    { kind: 'line-to', x: 20, y: 4 },
                    { kind: 'line-to', x: 20, y: 6 },
                    { kind: 'line-to', x: 21, y: 6 },
                    { kind: 'line-to', x: 21, y: 4 },
                    { kind: 'line-to', x: 24, y: 4 },
                    { kind: 'line-to', x: 24, y: 3 },
                    { kind: 'line-to', x: 21, y: 3 },
                    { kind: 'line-to', x: 21, y: 1 },
                    { kind: 'line-to', x: 20, y: 1 },
                  ],
                },
              ],
            },
          ],
        },
      ];

      const actual = renderCandleSeries(input);
      expect(actual).toEqual(expected);
    });
  });
});
