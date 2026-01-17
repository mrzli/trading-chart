import { describe, expect, it } from 'bun:test';
import {
  renderSimpleHorizontalAxis,
  RenderSimpleHorizontalAxisInput,
} from '@/chart/renderers';
import { DrawItem, DrawPathCommand, FontStyle, Rect } from '@/types';
import { getPixelAdjustment } from '@/util';

describe('simple-horizontal-axis', () => {
  describe('renderSimpleHorizontalAxis()', () => {
    const area: Rect = { x: 0, y: 0, width: 100, height: 20 };
    const fontStyle: FontStyle = { family: 'Arial', size: 12, weight: 400 };

    it('renders labels without ticks when offset is small', () => {
      const input: RenderSimpleHorizontalAxisInput = {
        area,
        color: '#222222',
        fontStyle,
        yOffset: 0,
        ticks: [
          { offset: 0, label: 'A' },
          { offset: 50, label: 'B' },
        ],
      };

      const expected: readonly DrawItem[] = [
        {
          kind: 'batch',
          clipPath: [{ kind: 'rect', ...area }],
          items: [
            {
              kind: 'batch',
              style: {
                fillStrokeStyle: { fillStyle: '#222222' },
                textStyle: {
                  font: fontStyle,
                  horizontalAlign: 'center',
                  verticalAlign: 'top',
                },
              },
              items: [
                { kind: 'text', x: 0, y: 0, text: 'A' },
                { kind: 'text', x: 50, y: 0, text: 'B' },
              ],
            },
          ],
        },
      ];

      const actual = renderSimpleHorizontalAxis(input);
      expect(actual).toEqual(expected);
    });

    it('renders labels and ticks when offset is large', () => {
      const input: RenderSimpleHorizontalAxisInput = {
        area,
        color: '#111111',
        fontStyle,
        yOffset: 10,
        ticks: [
          { offset: 10, label: 'T1' },
          { offset: 40, label: 'T2' },
        ],
      };

      const tickLength = 10 - 3;
      const thickness = 1;
      const adjustment = getPixelAdjustment(thickness);

      const commands: readonly DrawPathCommand[] = [
        {
          kind: 'move-to',
          x: area.x + 10 + adjustment,
          y: area.y,
        },
        {
          kind: 'line-to',
          x: area.x + 10 + adjustment,
          y: area.y + tickLength,
        },
        {
          kind: 'move-to',
          x: area.x + 40 + adjustment,
          y: area.y,
        },
        {
          kind: 'line-to',
          x: area.x + 40 + adjustment,
          y: area.y + tickLength,
        },
      ];

      const expected: readonly DrawItem[] = [
        {
          kind: 'batch',
          clipPath: [{ kind: 'rect', ...area }],
          items: [
            {
              kind: 'batch',
              style: {
                fillStrokeStyle: { fillStyle: '#111111' },
                textStyle: {
                  font: fontStyle,
                  horizontalAlign: 'center',
                  verticalAlign: 'top',
                },
              },
              items: [
                { kind: 'text', x: 10, y: 10, text: 'T1' },
                { kind: 'text', x: 40, y: 10, text: 'T2' },
              ],
            },
            {
              kind: 'batch',
              style: {
                fillStrokeStyle: { strokeStyle: '#111111' },
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

      const actual = renderSimpleHorizontalAxis(input);
      expect(actual).toEqual(expected);
    });
  });
});
