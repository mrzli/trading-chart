import { DrawItem } from '../../types';
import { TradingChartPlugin } from '../types';

export interface PluginExampleOptions {
  readonly name: string;
  readonly priority: number;
}

export function pluginExample(
  options: PluginExampleOptions,
): TradingChartPlugin {
  const { name, priority } = options;

  return {
    name,
    priority,
    execute: ({ chartInput, batch, context }) => {
      const newBatch: readonly DrawItem[] = [
        ...batch,
        {
          kind: 'batch',
          style: {
            fillStrokeStyle: { fillStyle: 'orange', strokeStyle: 'black' },
          },
          items: [
            {
              kind: 'path',
              fillStrokeType: 'both',
              commands: [
                {
                  kind: 'rect',
                  x: 20,
                  y: 30,
                  width: 400,
                  height: 150,
                },
              ],
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
