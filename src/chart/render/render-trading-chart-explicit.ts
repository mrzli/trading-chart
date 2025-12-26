import { TradingChartInputExplicit, TradingChartResult } from '../types';

export function renderTradingChartExplicit(
  input: TradingChartInputExplicit,
): TradingChartResult {
  const { size, layout } = input;

  return {
    batch: {
      kind: 'batch',
      items: [
        {
          kind: 'clear',
          area: {
            x: 0,
            y: 0,
            width: size.width,
            height: size.height,
          },
        },
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
    },
  };
}
