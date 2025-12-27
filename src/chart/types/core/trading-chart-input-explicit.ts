import { Size } from '../../../types';
import { TradingChartLayout } from './trading-chart-layout';
import { TradingChartTheme } from './trading-chart-theme';

export interface TradingChartInputExplicit {
  readonly size: Size;
  readonly layout: TradingChartLayout;
  readonly theme: TradingChartTheme;
}
