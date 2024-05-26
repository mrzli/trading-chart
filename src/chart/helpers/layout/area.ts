import { Rect, Size } from '../../types';

export interface ChartAreas {
  readonly full: Rect;
  readonly main: Rect;
  readonly xAxis: Rect;
  readonly yAxis: Rect;
  readonly corner: Rect;
}

export function getChartAreas(
  size: Size,
  xAxisHeight: number,
  yAxisWidth: number,
): ChartAreas {
  const { width, height } = size;

  const mainAreaWidth = width - yAxisWidth;
  const mainAreaHeight = height - xAxisHeight;

  const fullRect: Rect = {
    x: 0,
    y: 0,
    width,
    height,
  };

  const mainAreaRect: Rect = {
    x: 0,
    y: 0,
    width: mainAreaWidth,
    height: mainAreaHeight,
  };

  const xAxisRect: Rect = {
    x: 0,
    y: mainAreaHeight,
    width: mainAreaWidth,
    height: xAxisHeight,
  };

  const yAxisRect: Rect = {
    x: mainAreaWidth,
    y: 0,
    width: yAxisWidth,
    height: mainAreaHeight,
  };

  const cornerRect: Rect = {
    x: mainAreaWidth,
    y: mainAreaHeight,
    width: yAxisWidth,
    height: xAxisHeight,
  };

  return {
    full: fullRect,
    main: mainAreaRect,
    xAxis: xAxisRect,
    yAxis: yAxisRect,
    corner: cornerRect,
  };
}

export function getDefaultChartAreas(): ChartAreas {
  return getChartAreas({ width: 100, height: 100 }, 20, 20);
}
