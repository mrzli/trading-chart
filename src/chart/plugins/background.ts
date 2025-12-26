import { DrawItem, DrawPathCommand } from '../../types';
import { TradingChartPlugin } from '../types';

export function pluginBackground(
  name: string,
  priority: number,
  color: string,
): TradingChartPlugin {
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
