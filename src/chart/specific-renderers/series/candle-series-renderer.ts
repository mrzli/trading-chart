import { CanvasRenderer, createCanvasRenderer } from '../../canvas-renderer';
import { CandleSeriesData, drawCandleSeries } from '../../draw/series';
import { Rect, Size } from '../../types';

export function createCandleSeriesRenderer(
  area: Rect,
): CanvasRenderer<CandleSeriesData> {
  const renderer = (
    c: CanvasRenderingContext2D,
    _canvasSize: Size,
    area: Rect | undefined,
    data: CandleSeriesData,
  ): void => {
    if (area === undefined) {
      return;
    }

    drawCandleSeries(c, area, data);
  };

  const initialData: CandleSeriesData = {
    itemWidth: 10,
    items: [],
  };

  return createCanvasRenderer<CandleSeriesData>(area, initialData, renderer);
}
