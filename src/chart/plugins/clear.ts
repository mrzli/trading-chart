import { renderClear } from '../renderers';
import { TradingChartPlugin } from '../types';

export interface PluginClearOptions {
  readonly name: string;
  readonly priority: number;
}

export function pluginClear(options: PluginClearOptions): TradingChartPlugin {
  const { name, priority } = options;

  return {
    name,
    priority,
    execute: ({ chartInput, context }) => {
      const { size } = chartInput;

      const newBatch = renderClear({ size });

      return {
        batch: newBatch,
        context: context,
      };
    },
  };
}
