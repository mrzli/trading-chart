import {
  renderSimpleHorizontalAxis,
  RenderSimpleHorizontalAxisInput,
  renderVerticalLines,
  RenderVerticalLinesInput,
  SimpleHorizontalAxisTickItem,
} from '../../renderers';
import { TradingChartPlugin } from '../../types';
import { TimeAxisInput, processTimeAxisData } from './data-processing';

export interface PluginXAxisOptions {
  readonly name: string;
  readonly priority: number;
}

export function pluginXAxis(options: PluginXAxisOptions): TradingChartPlugin {
  const { name, priority } = options;

  return {
    name,
    priority,
    execute: ({ chartInput, areas, batch, context }) => {
      const { theme } = chartInput;
      const { xAxis, segments } = areas;
      const { main } = segments[0];

      const timeAxisInput: TimeAxisInput = {
        minTickDistance: 30,
        position: {
          rightItemOffset: 0,
          itemSpan: 20,
        },
        axisLength: 500,
        // data is OHLCV, with unix timestamps, just 20 items starting with 2025-01-01 UTC, separated by 1 minute
        data: [
          { time: 1735689600000, open: 100, high: 105, low: 95, close: 102, volume: 1500 },
          { time: 1735689660000, open: 102, high: 106, low: 101, close: 104, volume: 1200 },
          { time: 1735689720000, open: 104, high: 107, low: 103, close: 105, volume: 1300 },
          { time: 1735689780000, open: 105, high: 108, low: 104, close: 107, volume: 1100 },
          { time: 1735689840000, open: 107, high: 109, low: 106, close: 108, volume: 1400 },
          { time: 1735689900000, open: 108, high: 110, low: 107, close: 109, volume: 1600 },
          { time: 1735689960000, open: 109, high: 111, low: 108, close: 110, volume: 1700 },
          { time: 1735690020000, open: 110, high: 112, low: 109, close: 111, volume: 1800 },
          { time: 1735690080000, open: 111, high: 113, low: 110, close: 112, volume: 1900 },
          { time: 1735690140000, open: 112, high: 114, low: 111, close: 113, volume: 2000 },
          { time: 1735690200000, open: 113, high: 115, low: 112, close: 114, volume: 2100 },
          { time: 1735690260000, open: 114, high: 116, low: 113, close: 115, volume: 2200 },
          { time: 1735690320000, open: 115, high: 117, low: 114, close: 116, volume: 2300 },
          { time: 1735690380000, open: 116, high: 118, low: 115, close: 117, volume: 2400 },
          { time: 1735690440000, open: 117, high: 119, low: 116, close: 118, volume: 2500 },
          { time: 1735690500000, open: 118, high: 120, low: 117, close: 119, volume: 2600 },
          { time: 1735690560000, open: 119, high: 121, low: 118, close: 120, volume: 2700 },
          { time: 1735690620000, open: 120, high: 122, low: 119, close: 121, volume: 2800 },
          { time: 1735690680000, open: 121, high: 123, low: 120, close: 122, volume: 2900 },
          { time: 1735690740000, open: 122, high: 124, low: 121, close: 123, volume: 3000 },
        ],
        timeframe: {
          unit: 'm',
          value: 1,
        },
        timezone: 'UTC',
      };

      const xAxisData = processTimeAxisData(timeAxisInput);

      const xAxisTicks: readonly SimpleHorizontalAxisTickItem[] = xAxisData.map(
        (tick) => ({
          offset: tick.offset,
          label: tick.label,
        }),
      );

      const xAxisOffsets: readonly number[] = xAxisData.map(
        (tick) => tick.offset,
      );

      const renderInput: RenderSimpleHorizontalAxisInput = {
        area: xAxis,
        color: 'white',
        fontStyle: {},
        yOffset: 5,
        ticks: xAxisTicks,
      };
      const axisBatch = renderSimpleHorizontalAxis(renderInput);

      const renderLinesInput: RenderVerticalLinesInput = {
        area: main,
        batches: [
          {
            color: 'white',
            offsets: xAxisOffsets,
          },
        ],
      };
      const linesBatch = renderVerticalLines(renderLinesInput);

      return {
        batch: [...batch, ...linesBatch, ...axisBatch],
        context: context,
      };
    },
  };
}
