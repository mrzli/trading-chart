import { TimeAxisOutputItem } from '../../axis';
import { CanvasRenderer, createCanvasRenderer } from '../../canvas-renderer';
import { TextParameters, drawText } from '../../draw';
import { Rect, Size } from '../../types';

export function createHorizontalAxisRenderer(
  area: Rect,
): CanvasRenderer<readonly TimeAxisOutputItem[]> {
  const renderer = (
    c: CanvasRenderingContext2D,
    _canvasSize: Size,
    area: Rect | undefined,
    data: readonly TimeAxisOutputItem[],
  ): void => {
    if (area === undefined) {
      return;
    }

    // c.fillStyle = '#bbbbbb';

    // c.beginPath();
    // c.fillRect(area.x, area.y, area.width, area.height);
    // c.stroke();

    const { x, y, width } = area;

    for (const item of data) {
      const { offset, label } = item;

      if (offset < 0 || offset > width) {
        continue;
      }

      const params: TextParameters = {
        x: x + offset,
        y: y + 6,
        text: label,
        textAlign: 'center',
        textBaseline: 'top',
        color: 'white',
        font: '12px sans-serif',
      };

      drawText(c, params);
    }
  };

  return createCanvasRenderer<readonly TimeAxisOutputItem[]>(
    area,
    [],
    renderer,
  );
}