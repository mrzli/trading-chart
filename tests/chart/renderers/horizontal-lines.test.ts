import { describe, expect, it } from 'bun:test';
import {
  renderHorizontalLines,
  RenderHorizontalLinesInput,
} from '@/chart/renderers';
import { DrawItem, DrawPathCommand, PathStyle, Rect } from '@/types';
import { getPixelAdjustment } from '@/util';

describe('horizontal-lines', () => {
  describe('renderHorizontalLines()', () => {
    it('renders offsets with pixel adjustment and styles', () => {
      const area: Rect = { x: 10, y: 5, width: 100, height: 50 };
      const pathStyle: PathStyle = { lineWidth: 1 };

      const input: RenderHorizontalLinesInput = {
        area,
        batches: [
          {
            color: '#ff0000',
            pathStyle,
            offsets: [0, 10],
          },
        ],
      };

      const adjustment = getPixelAdjustment(pathStyle.lineWidth ?? 1);
      const y1 = area.y + 0 + adjustment;
      const y2 = area.y + 10 + adjustment;

      const commands: readonly DrawPathCommand[] = [
        { kind: 'move-to', x: area.x, y: y1 },
        { kind: 'line-to', x: area.x + area.width, y: y1 },
        { kind: 'move-to', x: area.x, y: y2 },
        { kind: 'line-to', x: area.x + area.width, y: y2 },
      ];

      const expected: readonly DrawItem[] = [
        {
          kind: 'batch',
          clipPath: [{ kind: 'rect', ...area }],
          items: [
            {
              kind: 'batch',
              style: {
                fillStrokeStyle: { strokeStyle: '#ff0000' },
                pathStyle,
              },
              items: [
                {
                  kind: 'path',
                  operation: 'stroke',
                  commands,
                },
              ],
            },
          ],
        },
      ];

      const actual = renderHorizontalLines(input);
      expect(actual).toEqual(expected);
    });
  });
});
