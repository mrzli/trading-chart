import { invariant } from '@gmjs/assert';
import {
  renderHorizontalLines,
  RenderHorizontalLinesInput,
  renderSimpleVerticalAxis,
  RenderSimpleVerticalAxisInput,
  SimpleVerticalAxisTickItem,
} from '../../renderers';
import { TradingChartPlugin } from '../../types';
import { processNumericAxisData } from './data-processing/process';
import { NumericAxisInput } from './data-processing/types';

export interface PluginYAxisOptions {
  readonly name: string;
  readonly priority: number;
  readonly segmentIndex: number;
}

export function pluginYAxis(options: PluginYAxisOptions): TradingChartPlugin {
  const { name, priority, segmentIndex } = options;

  return {
    name,
    priority,
    execute: ({ chartInput, areas, batch, context }) => {
      const { theme } = chartInput;
      const { segments } = areas;
      const { textColor, gridLineColor } = theme;

      invariant(
        segmentIndex >= 0 && segmentIndex < segments.length,
        'Invalid segment index.',
      );

      const { main, yAxis } = segments[segmentIndex];

      const priceAxisInput: NumericAxisInput = {
        minTickDistance: 30,
        range: {
          from: 0,
          to: 200,
        },
        axisLength: yAxis.height,
        precision: 1,
        tickSize: 10,
      };

      const yAxisData = processNumericAxisData(priceAxisInput);

      const yAxisTicks: readonly SimpleVerticalAxisTickItem[] = yAxisData.map(
        (tick) => ({
          offset: tick.offset,
          label: tick.label,
        }),
      );

      const yAxisOffsets: readonly number[] = yAxisData.map(
        (tick) => tick.offset,
      );

      const renderAxisInput: RenderSimpleVerticalAxisInput = {
        area: yAxis,
        color: textColor,
        fontStyle: {},
        xOffset: 5,
        ticks: yAxisTicks,
      };
      const axisBatch = renderSimpleVerticalAxis(renderAxisInput);

      const renderLinesInput: RenderHorizontalLinesInput = {
        area: main,
        batches: [
          {
            color: gridLineColor,
            offsets: yAxisOffsets,
          },
        ],
      };
      const linesBatch = renderHorizontalLines(renderLinesInput);

      return {
        batch: [...batch, ...linesBatch, ...axisBatch],
        context: context,
      };
    },
  };
}
