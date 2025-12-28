import { Size } from '../../../types';
import { Ohlc, TradingChartTimeframe } from '../data';
import { TradingChartLayout } from './trading-chart-layout';
import { TradingChartTheme } from './trading-chart-theme';

export interface TradingChartInputExplicit {
  readonly size: Size;
  readonly layout: TradingChartLayout;
  readonly theme: TradingChartTheme;
  readonly data: readonly Ohlc[];
  readonly timeframe: TradingChartTimeframe;
  readonly timezone: string;
}
