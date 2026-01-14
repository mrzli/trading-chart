import { Range, Size } from '../../../types';
import { Ohlc, TradingChartTimeframe } from '../data';
import { SeriesPosition, TradingChartCursorPosition } from '../position';
import { TradingChartLayout } from './trading-chart-layout';
import { TradingChartSegmentInputExplicit } from './trading-chart-segment-input-explicit';
import { TradingChartTheme } from './trading-chart-theme';

export interface TradingChartInputExplicit {
  readonly size: Size;
  readonly layout: TradingChartLayout;
  readonly theme: TradingChartTheme;
  readonly segments: readonly TradingChartSegmentInputExplicit[];
  readonly data: readonly Ohlc[];
  readonly dataVisibleSpan: Range | undefined;
  readonly timeframe: TradingChartTimeframe;
  readonly timezone: string;
  readonly position: SeriesPosition;
  readonly cursorPosition: TradingChartCursorPosition | undefined;
}
