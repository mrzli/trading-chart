import { isoDateTimeToUnixSeconds } from '@gmjs/date-util';
import {
  CanvasChartData,
  CanvasChartInput,
  CanvasChartOptions,
  Interval,
  MIN_X_AXIS_TICK_DISTANCE,
  MIN_Y_AXIS_TICK_DISTANCE,
  createCanvasChart,
} from '../../chart';
import { TEST_RAW_OHLC_DATA, convertRawOhlcDataToInterval } from '../test-data';

export function setupChart(
  wrapperElement: HTMLDivElement,
  chartElement: HTMLCanvasElement,
): void {
  const input: CanvasChartInput = { canvas: chartElement };
  const options: CanvasChartOptions = {
    minXAxisTickDistance: MIN_X_AXIS_TICK_DISTANCE,
    minYAxisTickDistance: MIN_Y_AXIS_TICK_DISTANCE,
  };

  const chart = createCanvasChart(input, options);
  chart.initialize();

  const startDate = isoDateTimeToUnixSeconds('2020-01-01T00:00:00Z');
  const interval: Interval = { unit: 'm', value: 1 };

  const items = convertRawOhlcDataToInterval(
    TEST_RAW_OHLC_DATA,
    startDate,
    interval,
  );

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
