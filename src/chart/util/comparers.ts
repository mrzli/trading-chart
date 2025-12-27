import { Range } from '../../types';
import {
  SeriesPosition,
  TradingChartPosition,
  TradingChartTimeframe,
} from '../types';

export function ieSeriesPositionEqual(
  sp1: SeriesPosition,
  sp2: SeriesPosition,
): boolean {
  return (
    sp1.rightItemOffset === sp2.rightItemOffset && sp1.itemSpan === sp2.itemSpan
  );
}

export function isTradingChartPositionEqual(
  p1: TradingChartPosition,
  p2: TradingChartPosition,
): boolean {
  return (
    ieSeriesPositionEqual(p1.seriesPosition, p2.seriesPosition) &&
    isRangeEqual(p1.range, p2.range)
  );
}

export function isRangeEqual(a: Range, b: Range): boolean {
  return a.from === b.from && a.to === b.to;
}

export function isTradingChartTimeframeEqual(
  t1: TradingChartTimeframe,
  t2: TradingChartTimeframe,
): boolean {
  return t1.unit === t2.unit && t1.value === t2.value;
}
