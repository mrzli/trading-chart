import { Rect, Size } from '../../types';
import {
  TradingChartAreaMainWithYAxis,
  TradingChartAreas,
  TradingChartLayout,
} from '../types';

export function calculateTradingChartAreas(
  size: Size,
  layout: TradingChartLayout,
): TradingChartAreas {
  const { width, height } = size;
  const { padding, heights, xAxisHeight, yAxisWidth } = layout;
  const { left, right, top, bottom } = padding;

  const entire: Rect = { x: 0, y: 0, width, height };

  const all: Rect = {
    x: left,
    y: top,
    width: width - left - right,
    height: height - top - bottom,
  };

  let currentY = top;
  const mains: TradingChartAreaMainWithYAxis[] = [];
  
  for (const currHeight of heights) {
    const main: Rect = {
      x: left,
      y: currentY,
      width: all.width - yAxisWidth,
      height: currHeight,
    };

    const yAxis: Rect = {
      x: left + all.width - yAxisWidth,
      y: currentY,
      width: yAxisWidth,
      height: currHeight,
    };

    mains.push({ main, yAxis });
    currentY += currHeight;
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
    mains,
    xAxis,
    corner,
  };
}
