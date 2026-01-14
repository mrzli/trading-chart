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
  options: PluginCandleSeriesOptions,
): TradingChartPlugin {
  const { name, priority, segmentIndex } = options;

  return {
    name,
    priority,
    execute: ({ chartInput, areas, batch, context }) => {
      const {
        theme,
        segments: segmentInputs,
        data,
        dataVisibleSpan,
        position,
      } = chartInput;
      const { segments } = areas;
      const { bullColor, bearColor } = theme;

      invariant(
        segmentIndex >= 0 && segmentIndex < segments.length,
        'Invalid segment index.',
      );

      const { range } = segmentInputs[segmentIndex];
      const { main } = segments[segmentIndex];

      const candleSeriesInput: CandleSeriesInput = {
        data,
        dataVisibleSpan,
        position,
        xAxisLength: main.width,
        priceRange: range,
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
            color: item.type === 'bull' ? bullColor : bearColor,
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
