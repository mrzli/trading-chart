import { renderBackground } from '../renderers';
import { TradingChartPlugin } from '../types';

export interface PluginBackgroundOptions {
  readonly name: string;
  readonly priority: number;
}

export function pluginBackground(
  options: PluginBackgroundOptions,
): TradingChartPlugin {
  const { name, priority } = options;

  return {
    name,
    priority,
    execute: ({ chartInput, batch, context }) => {
      const { size, theme } = chartInput;
      const { backgroundColor } = theme;

      const newBatch = renderBackground({ size, color: backgroundColor });

      return {
        batch: [...batch, ...newBatch],
        context: context,
      };
    },
  };
}
