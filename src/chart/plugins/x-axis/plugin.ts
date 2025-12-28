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
      const { theme, data, timeframe, timezone } = chartInput;
      const { xAxis, segments } = areas;
      const { textColor, gridLineColor } = theme;

      const { main } = segments[0];

      const timeAxisInput: TimeAxisInput = {
        minTickDistance: 80,
        position: {
          rightItemOffset: 60,
          itemSpan: 100,
        },
        axisLength: main.width,
        data,
        timeframe,
        timezone,
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
        color: textColor,
        fontStyle: {},
        yOffset: 5,
        ticks: xAxisTicks,
      };
      const axisBatch = renderSimpleHorizontalAxis(renderInput);

      const renderLinesInput: RenderVerticalLinesInput = {
        area: main,
        batches: [
          {
            color: gridLineColor,
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
