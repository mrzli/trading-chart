import { Size } from '../../../types';
import { TradingChartLayout } from './trading-chart-layout';

export interface TradingChartInputExplicit {
  readonly size: Size;
  readonly layout: TradingChartLayout;
}
