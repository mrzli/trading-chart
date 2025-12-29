import { Rect, Size } from '../../types';
import {
  TradingChartAreaMainWithYAxis,
  TradingChartAreas,
  TradingChartLayout,
  TradingChartSegmentInputExplicit,
} from '../types';

export function calculateTradingChartAreas(
  size: Size,
  layout: TradingChartLayout,
  segments: readonly TradingChartSegmentInputExplicit[],
): TradingChartAreas {
  const { width, height } = size;
  const { padding, xAxisHeight, yAxisWidth } = layout;
  const { left, right, top, bottom } = padding;

  const entire: Rect = { x: 0, y: 0, width, height };

  const all: Rect = {
    x: left,
    y: top,
    width: width - left - right,
    height: height - top - bottom,
  };

  let currentY = top;
  const segmentAreas: TradingChartAreaMainWithYAxis[] = [];
  
  for (const segment of segments) {
    const { height } = segment;

    const main: Rect = {
      x: left,
      y: currentY,
      width: all.width - yAxisWidth,
      height: segment.height,
    };

    const yAxis: Rect = {
      x: left + all.width - yAxisWidth,
      y: currentY,
      width: yAxisWidth,
      height,
    };

    segmentAreas.push({ main, yAxis });
    currentY += height;
  }

  const xAxis: Rect = {
    x: all.x,
    y: all.y + all.height - xAxisHeight,
    width: all.width,
    height: xAxisHeight,
  };

  const corner: Rect = {
    x: all.x + all.width - yAxisWidth,
    y: all.y + all.height - xAxisHeight,
    width: yAxisWidth,
    height: xAxisHeight,
  };

  return {
    entire,
    all,
    segments: segmentAreas,
    xAxis,
    corner,
  };
}
