import { renderBackground } from '../renderers';
import { TradingChartPlugin } from '../types';

export interface PluginBackgroundOptions {
  readonly name: string;
  readonly priority: number;
  readonly color: string;
}

export function pluginBackground(
  options: PluginBackgroundOptions,
): TradingChartPlugin {
  const { name, priority, color } = options;

  return {
    name,
    priority,
    execute: ({ chartInput, batch, context }) => {
      const { size } = chartInput;

      const newBatch = renderBackground({ size, color });

      return {
        batch: [
          ...batch,
          ...newBatch,
        ],
        context: context,
      };
    },
  };
}
