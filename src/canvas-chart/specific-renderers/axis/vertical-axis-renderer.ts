import { PriceAxisOutputItem } from '../../axis/price/types/price-axis-output-item';
import { CanvasRenderer, createCanvasRenderer } from '../../canvas-renderer';
import { TextParameters, drawText } from '../../draw';
import { Rect, Size } from '../../types';

export function createVerticalAxisRenderer(
  area: Rect,
): CanvasRenderer<readonly PriceAxisOutputItem[]> {
  const renderer = (
    c: CanvasRenderingContext2D,
    _canvasSize: Size,
    area: Rect | undefined,
    data: readonly PriceAxisOutputItem[],
  ): void => {
    if (area === undefined) {
      return;
    }

    // c.fillStyle = '#bbbbbb';

    // c.beginPath();
    // c.fillRect(area.x, area.y, area.width, area.height);
    // c.stroke();

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
        font: '12px sans-serif',
        // font: '12px Courier New',
      };

      drawText(c, params);
    }
  };

  return createCanvasRenderer<readonly PriceAxisOutputItem[]>(
    area,
    [],
    renderer,
  );
}
