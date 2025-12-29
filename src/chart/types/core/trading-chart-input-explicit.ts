import { Range, Size } from '../../../types';
import { Ohlc, TradingChartTimeframe } from '../data';
import { SeriesPosition } from '../position';
import { TradingChartLayout } from './trading-chart-layout';
import { TradingChartTheme } from './trading-chart-theme';

export interface TradingChartInputExplicit {
  readonly size: Size;
  readonly layout: TradingChartLayout;
  readonly theme: TradingChartTheme;
  readonly data: readonly Ohlc[];
  readonly dataVisibleSpan: Range | undefined;
  readonly timeframe: TradingChartTimeframe;
  readonly timezone: string;
  readonly position: SeriesPosition;
}
