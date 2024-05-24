import { CanvasRenderer, createCanvasRenderer } from '../../canvas-renderer';
import { CandleSeriesItem } from '../../draw';
import { ChartAreas, getDefaultChartAreas } from '../../helpers';
import { Ohlc, Rect } from '../../types';

export interface CursorRendererDataItem {
  readonly ohlc: Ohlc;
  readonly candle: CandleSeriesItem;
}

export interface CursorRendererData {
  readonly items: readonly CursorRendererDataItem[];
  readonly areas: ChartAreas;
}

export function createCursorRenderer(
  area: Rect,
): CanvasRenderer<CursorRendererData> {
  const renderer = (
    _c: CanvasRenderingContext2D,
    _area: Rect | undefined,
    _data: CursorRendererData,
  ): void => {};

  const initialData: CursorRendererData = {
    items: [],
    areas: getDefaultChartAreas(),
  };

  return createCanvasRenderer<CursorRendererData>(area, initialData, renderer);
}
