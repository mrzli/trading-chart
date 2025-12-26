import { DrawItem } from '../../types';
import { TradingChartPlugin } from '../types';

export interface PluginClearOptions {
  readonly name: string;
  readonly priority: number;
}

export function pluginClear(
  options: PluginClearOptions,
): TradingChartPlugin {
  const { name, priority } = options;

  return {
    name,
    priority,
    execute: ({ chartInput, context }) => {
      const { width, height } = chartInput.size

      const newBatch: readonly DrawItem[] = [
        {
          kind: 'clear',
          area: {
            x: 0,
            y: 0,
            width,
            height
          },
        },
      ];

      return {
        batch: newBatch,
        context: context,
      };
    },
  };
}
