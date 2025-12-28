import { invariant } from '@gmjs/assert';
import {
  CandleSeriesRenderItem,
  renderCandleSeries,
  RenderCandleSeriesInput,
} from '../../renderers';
import {
  CandleSeriesInput,
  CandleSeriesOutputItem,
  processCandleSeriesData,
} from './data-processing';
import { TradingChartPlugin } from '../../types';

export interface PluginCandleSeriesOptions {
  readonly name: string;
  readonly priority: number;
  readonly segmentIndex: number;
}

export function pluginCandleSeries(
  config: PluginCandleSeriesOptions,
): TradingChartPlugin {
  const { name, priority, segmentIndex } = config;

  return {
    name,
    priority,
    execute: ({ chartInput, areas, batch, context }) => {
      const { theme, data } = chartInput;
      const { segments } = areas;
      const { textColor, gridLineColor } = theme;

      invariant(
        segmentIndex >= 0 && segmentIndex < segments.length,
        'Invalid segment index.',
      );

      const { main, yAxis } = segments[segmentIndex];

      const candleSeriesInput: CandleSeriesInput = {
        data,
        dataDisplayRange: undefined,
        position: {
          rightItemOffset: 60,
          itemSpan: 100,
        },
        xAxisLength: main.width,
        priceRange: {
          from: 0,
          to: 200,
        },
        yAxisLength: main.height,
      };

      const candleSeriesData = processCandleSeriesData(candleSeriesInput);

      const items: readonly CandleSeriesRenderItem[] =
        candleSeriesData.items.map((item: CandleSeriesOutputItem) => {
          return {
            xCenter: item.x,
            y1: item.y1,
            y2: item.y2,
            y3: item.y3,
            y4: item.y4,
            color: item.type === 'bull' ? 'green' : 'red',
          };
        });

      const renderInput: RenderCandleSeriesInput = {
        area: main,
        itemWidth: candleSeriesData.itemWidth,
        items,
      };

      const candleSeriesBatch = renderCandleSeries(renderInput);

      return {
        batch: [...batch, ...candleSeriesBatch],
        context,
      };
    },
  };
}
