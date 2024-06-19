import {
  CanvasChartInput,
  CanvasChartOptions,
  MIN_X_AXIS_TICK_DISTANCE,
  MIN_Y_AXIS_TICK_DISTANCE,
  createCanvasChart,
} from '../../../chart';
import { getChartData } from './built-in-chart-data';
// import { getChartData } from './server-chart-data';
// import { getChartData } from './server-chart-data-databento';

export async function setupChart(
  wrapperElement: HTMLDivElement,
  chartElement: HTMLCanvasElement,
): Promise<void> {
  const input: CanvasChartInput = { canvas: chartElement };
  const options: CanvasChartOptions = {
    minXAxisTickDistance: MIN_X_AXIS_TICK_DISTANCE,
    minYAxisTickDistance: MIN_Y_AXIS_TICK_DISTANCE,
    fontSize: 12,
  };

  const chart = createCanvasChart(input, options);
  chart.initialize();

  const data = await getChartData();

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
