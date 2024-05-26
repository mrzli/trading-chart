import { PriceAxisOutputItem } from '../../axis/price/types/price-axis-output-item';
import { CanvasRenderer, createCanvasRenderer } from '../../canvas-renderer';
import { TextParameters, drawText } from '../../draw';
import { Rect } from '../../types';

export function createVerticalAxisRenderer(
  area: Rect,
): CanvasRenderer<readonly PriceAxisOutputItem[]> {
  const renderer = (
    c: CanvasRenderingContext2D,
    area: Rect | undefined,
    data: readonly PriceAxisOutputItem[],
  ): void => {
    if (area === undefined) {
      return;
    }

    const { x, y, height } = area;

    for (const item of data) {
      const { offset, label } = item;

      if (offset < 0 || offset > height) {
        continue;
      }

      const params: TextParameters = {
        x: x + 6,
        y: y + offset,
        text: label,
        textAlign: 'start',
        textBaseline: 'middle',
        color: 'white',
        fontSize: 12,
        fontFamily: 'sans-serif',
      };

      drawText(c, params);
    }
  };

  return createCanvasRenderer<readonly PriceAxisOutputItem[]>(
    area,
    undefined,
    renderer,
  );
}
