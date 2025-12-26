import { DrawItem, DrawPathCommand } from '../../types';
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
      const { width, height } = chartInput.size;

      const rectCommand: DrawPathCommand = {
        kind: 'rect',
        x: 0,
        y: 0,
        width,
        height,
      };

      const newBatch: readonly DrawItem[] = [
        ...batch,
        {
          kind: 'batch',
          clipPath: [rectCommand],
          style: {
            fillStrokeStyle: { fillStyle: color },
          },
          items: [
            {
              kind: 'path',
              fillStrokeType: 'fill',
              commands: [rectCommand],
            },
          ],
        },
      ];

      return {
        batch: newBatch,
        context: context,
      };
    },
  };
}
