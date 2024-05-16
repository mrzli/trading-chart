import {
  CanvasChartData,
  CanvasChartInput,
  createCanvasChart,
} from '../../chart';
import { TEST_OHLC_MINUTE } from '../test-data';

export function setupChart(
  wrapperElement: HTMLDivElement,
  chartElement: HTMLCanvasElement,
): void {
  const input: CanvasChartInput = { canvas: chartElement };
  const chart = createCanvasChart(input);
  chart.initialize();

  const data: CanvasChartData = { items: TEST_OHLC_MINUTE };

  chart.setData(data);

  const resizeObserver = new ResizeObserver((entries) => {
    const chartWrapperEntry = entries.find(
      (entry) => entry.target.id === 'chart-wrapper',
    );
    if (chartWrapperEntry === undefined) {
      return;
    }

    const contentRect = chartWrapperEntry.contentRect;
    chartElement.width = contentRect.width;
    chartElement.height = contentRect.height;

    chart.resize({ width: contentRect.width, height: contentRect.height });
  });

  resizeObserver.observe(wrapperElement);
}
