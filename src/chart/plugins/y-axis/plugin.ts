import { Rect } from '../../../types';
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

export interface PlugingYAxisOptions {
  readonly name: string;
  readonly priority: number;
}

export function pluginYAxis(options: PlugingYAxisOptions): TradingChartPlugin {
  const { name, priority } = options;

  const area: Rect = {
    x: 400,
    y: 0,
    width: 100,
    height: 400,
  };

  return {
    name,
    priority,
    execute: ({ chartInput, batch, context }) => {
      const priceAxisInput: NumericAxisInput = {
        minTickDistance: 30,
        range: {
          from: 0,
          to: 200,
        },
        axisLength: 400,
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
        area,
        color: 'white',
        fontStyle: {},
        xOffset: 5,
        ticks: yAxisTicks,
      };
      const axisBatch = renderSimpleVerticalAxis(renderAxisInput);

      const renderLinesInput: RenderHorizontalLinesInput = {
        area: {
          x: 0,
          y: 0,
          width: 400,
          height: 400,
        },
        batches: [
          {
            color: 'white',
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
