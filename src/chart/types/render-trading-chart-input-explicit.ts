import { Size } from "../../types";
import { TradingChartLayout } from "./trading-chart-layout";

export interface RenderTradingChartInputExplicit {
  readonly size: Size;
  readonly layout: TradingChartLayout;
}
