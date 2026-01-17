import { describe, expect, it } from 'bun:test';
import { renderSimpleCursor, RenderSimpleCursorInput } from '@/chart/renderers';
import { DrawItem, FontStyle, Margin, PathStyle, Rect } from '@/types';
import { getPixelAdjustment } from '@/util';

describe('simple-cursor', () => {
  describe('renderSimpleCursor()', () => {
    it('returns empty when position is undefined', () => {
      const input: RenderSimpleCursorInput = {
        fullArea: { x: 0, y: 0, width: 10, height: 10 },
        mainArea: { x: 0, y: 0, width: 10, height: 10 },
        xAxisArea: undefined,
        yAxisArea: undefined,
        position: undefined,
        lineColor: '#000',
        fontColor: '#000',
        textBoxColor: '#fff',
        pathStyle: undefined,
        fontStyle: undefined,
        xAxisText: undefined,
        xAxisBoxOffset: undefined,
        xAxisBoxPadding: undefined,
        yAxisText: undefined,
        yAxisBoxOffset: undefined,
        yAxisBoxPadding: undefined,
      };

      const actual = renderSimpleCursor(input);
      expect(actual).toEqual([]);
    });

    it('renders cursor lines and axis labels', () => {
      const fullArea: Rect = { x: 0, y: 0, width: 200, height: 100 };
      const mainArea: Rect = { x: 10, y: 10, width: 180, height: 60 };
      const xAxisArea: Rect = { x: 10, y: 70, width: 180, height: 20 };
      const yAxisArea: Rect = { x: 0, y: 10, width: 10, height: 60 };

      const pathStyle: PathStyle = { lineWidth: 2 };
      const fontStyle: FontStyle = { family: 'Arial', size: 12, weight: 400 };
      const xAxisBoxPadding: Margin = { top: 1, right: 2, bottom: 1, left: 2 };
      const yAxisBoxPadding: Margin = { top: 2, right: 3, bottom: 2, left: 3 };

      const input: RenderSimpleCursorInput = {
        fullArea,
        mainArea,
        xAxisArea,
        yAxisArea,
        position: { x: 50, y: 30 },
        lineColor: '#ff00ff',
        fontColor: '#333333',
        textBoxColor: '#eeeeee',
        pathStyle,
        fontStyle,
        xAxisText: '10:00',
        xAxisBoxOffset: 4,
        xAxisBoxPadding,
        yAxisText: '123',
        yAxisBoxOffset: 3,
        yAxisBoxPadding,
      };

      const adjustment = getPixelAdjustment(pathStyle.lineWidth ?? 1);
      const x = mainArea.x + 50 + adjustment;
      const y = mainArea.y + 30 + adjustment;

      const expected: readonly DrawItem[] = [
        {
          kind: 'batch',
          clipPath: [{ kind: 'rect', ...fullArea }],
          items: [
            {
              kind: 'batch',
              clipPath: [{ kind: 'rect', ...mainArea }],
              style: {
                fillStrokeStyle: { strokeStyle: '#ff00ff' },
                pathStyle,
              },
              items: [
                {
                  kind: 'path',
                  operation: 'stroke',
                  commands: [
                    { kind: 'move-to', x, y: mainArea.y },
                    { kind: 'line-to', x, y: mainArea.y + mainArea.height },
                    { kind: 'move-to', x: mainArea.x, y },
                    { kind: 'line-to', x: mainArea.x + mainArea.width, y },
                  ],
                },
              ],
            },
            {
              kind: 'batch',
              clipPath: undefined,
              style: {
                fillStrokeStyle: { fillStyle: '#eeeeee' },
                textStyle: {
                  font: fontStyle,
                  horizontalAlign: 'center',
                  verticalAlign: 'top',
                },
              },
              items: [
                {
                  kind: 'batch',
                  style: {
                    fillStrokeStyle: { fillStyle: '#eeeeee' },
                  },
                  items: [
                    {
                      kind: 'text-box',
                      text: '10:00',
                      x: 60,
                      y: 74,
                      operation: 'fill',
                      boxPadding: xAxisBoxPadding,
                    },
                  ],
                },
                {
                  kind: 'batch',
                  style: {
                    fillStrokeStyle: { fillStyle: '#333333' },
                  },
                  items: [
                    {
                      kind: 'text',
                      text: '10:00',
                      x: 60,
                      y: 75,
                    },
                  ],
                },
              ],
            },
            {
              kind: 'batch',
              clipPath: undefined,
              style: {
                fillStrokeStyle: { fillStyle: '#eeeeee' },
                textStyle: {
                  font: fontStyle,
                  horizontalAlign: 'left',
                  verticalAlign: 'middle',
                },
              },
              items: [
                {
                  kind: 'batch',
                  style: {
                    fillStrokeStyle: { fillStyle: '#eeeeee' },
                  },
                  items: [
                    {
                      kind: 'text-box',
                      text: '123',
                      x: 3,
                      y: 40,
                      operation: 'fill',
                      boxPadding: yAxisBoxPadding,
                    },
                  ],
                },
                {
                  kind: 'batch',
                  style: {
                    fillStrokeStyle: { fillStyle: '#333333' },
                  },
                  items: [
                    {
                      kind: 'text',
                      text: '123',
                      x: 6,
                      y: 40,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];

      const actual = renderSimpleCursor(input);
      expect(actual).toEqual(expected);
    });
  });
});
