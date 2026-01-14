import { invariant } from '@gmjs/assert';
import {
  BarSeriesRenderItem,
  renderBarSeries,
  RenderBarSeriesInput,
} from '../../renderers';
import { TradingChartPlugin } from '../../types';
import {
  VolumeSeriesInput,
  VolumeSeriesOutputItem,
} from './data-processing/types';
import { Rect } from '../../../types';
import { processVolumeSeries } from './data-processing/process';

export interface PluginVolumeSeriesOptions {
  readonly name: string;
  readonly priority: number;
  readonly segmentIndex: number;
  readonly heightFraction: number;
}

export function pluginVolumeSeries(
  options: PluginVolumeSeriesOptions,
): TradingChartPlugin {
  const { name, priority, segmentIndex, heightFraction } = options;

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
      const { volumeBullColor, volumeBearColor } = theme;

      invariant(
        segmentIndex >= 0 && segmentIndex < segments.length,
        'Invalid segment index.',
      );

      const { main } = segments[segmentIndex];

      const volumeSeriesAreaHeight = Math.floor(main.height * heightFraction);

      const volumeSeriesArea: Rect = {
        x: main.x,
        y: main.y + main.height - volumeSeriesAreaHeight,
        width: main.width,
        height: volumeSeriesAreaHeight,
      };

      const volumeSeriesInput: VolumeSeriesInput = {
        data,
        dataVisibleSpan,
        position,
        xAxisLength: main.width,
        height: volumeSeriesAreaHeight,
      };

      const volumeSeriesData = processVolumeSeries(volumeSeriesInput);

      const items: readonly BarSeriesRenderItem[] = volumeSeriesData.items.map(
        (item: VolumeSeriesOutputItem) => {
          return {
            xItem: item.x,
            y1: item.y1,
            y2: item.y2,
            color: item.type === 'bull' ? volumeBullColor : volumeBearColor,
          };
        },
      );

      const renderInput: RenderBarSeriesInput = {
        area: volumeSeriesArea,
        itemWidth: volumeSeriesData.itemWidth,
        items,
      };

      const volumeSeriesBatch = renderBarSeries(renderInput);

      return {
        batch: [...batch, ...volumeSeriesBatch],
        context,
      };
    },
  };
}
