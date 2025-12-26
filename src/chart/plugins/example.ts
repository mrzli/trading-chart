import { TradingChartPlugin } from '../types';

export function pluginExample(
  name: string,
  priority: number,
): TradingChartPlugin {
  return {
    name,
    priority,
    execute: ({ chartInput, batch, context }) => {
      const { width, height } = chartInput.size;

      return {
        batch: [
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
        ],
        context: context,
      };
    },
  };
}
