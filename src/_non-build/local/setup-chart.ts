import {
  CanvasChartData,
  CanvasChartInput,
  Interval,
  createCanvasChart,
} from '../../chart';
import { TEST_RAW_OHLC_DATA, convertRawOhlcDataToInterval } from '../test-data';

export function setupChart(
  wrapperElement: HTMLDivElement,
  chartElement: HTMLCanvasElement,
): void {
  const input: CanvasChartInput = { canvas: chartElement };
  const chart = createCanvasChart(input);
  chart.initialize();

  const interval: Interval = { unit: 'Y', value: 1 };

  const items = convertRawOhlcDataToInterval(TEST_RAW_OHLC_DATA, interval);

  const data: CanvasChartData = { items, interval };

  chart.setData(data);
  chart.setTimezone('UTC');

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
