import { describe, expect, it } from 'bun:test';
import {
  renderVerticalLines,
  RenderVerticalLinesInput,
} from '@/chart/renderers';
import { DrawItem, DrawPathCommand, PathStyle, Rect } from '@/types';
import { getPixelAdjustment } from '@/util';

describe('vertical-lines', () => {
  describe('renderVerticalLines()', () => {
    it('renders offsets with pixel adjustment and styles', () => {
      const area: Rect = { x: 8, y: 12, width: 40, height: 30 };
      const pathStyle: PathStyle = { lineWidth: 1 };

      const input: RenderVerticalLinesInput = {
        area,
        batches: [
          {
            color: '#00aaff',
            pathStyle,
            offsets: [0, 15],
          },
        ],
      };

      const adjustment = getPixelAdjustment(pathStyle.lineWidth ?? 1);
      const x1 = area.x + 0 + adjustment;
      const x2 = area.x + 15 + adjustment;

      const commands: readonly DrawPathCommand[] = [
        { kind: 'move-to', x: x1, y: area.y },
        { kind: 'line-to', x: x1, y: area.y + area.height },
        { kind: 'move-to', x: x2, y: area.y },
        { kind: 'line-to', x: x2, y: area.y + area.height },
      ];

      const expected: readonly DrawItem[] = [
        {
          kind: 'batch',
          clipPath: [{ kind: 'rect', ...area }],
          items: [
            {
              kind: 'batch',
              style: {
                fillStrokeStyle: { strokeStyle: '#00aaff' },
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

      const actual = renderVerticalLines(input);
      expect(actual).toEqual(expected);
    });
  });
});
