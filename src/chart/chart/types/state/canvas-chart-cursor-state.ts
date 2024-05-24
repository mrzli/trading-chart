import { Point } from '../../../types';

export interface CanvasChartCursorState {
  readonly pixelPosition: Point;
  readonly price: number;
  readonly seriesItemIndex: number;
}
