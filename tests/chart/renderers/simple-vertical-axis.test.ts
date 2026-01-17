import { describe, expect, it } from 'bun:test';
import {
  renderSimpleVerticalAxis,
  RenderSimpleVerticalAxisInput,
} from '@/chart/renderers';
import { DrawItem, DrawPathCommand, FontStyle, Rect } from '@/types';
import { getPixelAdjustment } from '@/util';

describe('simple-vertical-axis', () => {
  describe('renderSimpleVerticalAxis()', () => {
    const area: Rect = { x: 0, y: 0, width: 30, height: 100 };
    const fontStyle: FontStyle = { family: 'Arial', size: 12, weight: 400 };

    it('renders labels without ticks when offset is small', () => {
      const input: RenderSimpleVerticalAxisInput = {
        area,
        color: '#444444',
        fontStyle,
        xOffset: 0,
        ticks: [
          { offset: 0, label: '0' },
          { offset: 25, label: '25' },
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
                fillStrokeStyle: { fillStyle: '#444444' },
                textStyle: {
                  font: fontStyle,
                  horizontalAlign: 'left',
                  verticalAlign: 'middle',
                },
              },
              items: [
                { kind: 'text', x: 0, y: 0, text: '0' },
                { kind: 'text', x: 0, y: 25, text: '25' },
              ],
            },
          ],
        },
      ];

      const actual = renderSimpleVerticalAxis(input);
      expect(actual).toEqual(expected);
    });

    it('renders labels and ticks when offset is large', () => {
      const input: RenderSimpleVerticalAxisInput = {
        area,
        color: '#111111',
        fontStyle,
        xOffset: 12,
        ticks: [
          { offset: 10, label: 'L1' },
          { offset: 40, label: 'L2' },
        ],
      };

      const tickLength = 12 - 3;
      const thickness = 1;
      const adjustment = getPixelAdjustment(thickness);

      const commands: readonly DrawPathCommand[] = [
        {
          kind: 'move-to',
          x: area.x,
          y: area.y + 10 + adjustment,
        },
        {
          kind: 'line-to',
          x: area.x + tickLength,
          y: area.y + 10 + adjustment,
        },
        {
          kind: 'move-to',
          x: area.x,
          y: area.y + 40 + adjustment,
        },
        {
          kind: 'line-to',
          x: area.x + tickLength,
          y: area.y + 40 + adjustment,
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
                  horizontalAlign: 'left',
                  verticalAlign: 'middle',
                },
              },
              items: [
                { kind: 'text', x: 12, y: 10, text: 'L1' },
                { kind: 'text', x: 12, y: 40, text: 'L2' },
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

      const actual = renderSimpleVerticalAxis(input);
      expect(actual).toEqual(expected);
    });
  });
});
