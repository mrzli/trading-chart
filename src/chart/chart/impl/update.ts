import { clamp } from '@gmjs/number-util';
import {
  PriceAxisInput,
  processPriceAxisData,
  processTimeAxisData,
} from '../../axis';
import {
  CanvasRenderer,
  CanvasRenderingPipelineOptions,
  createCanvasRenderingPipeline,
} from '../../canvas-renderer';
import { CandleSeriesData } from '../../draw';
import { getOhlcSeriesValues } from '../../helpers';
import {
  GridData,
  createCandleSeriesRenderer,
  createGridRenderer,
  createHorizontalAxisRenderer,
  createVerticalAxisRenderer,
} from '../../specific-renderers';
import {
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../types';
import { TimeAxisInput } from '../../axis/time/types/time-axis-input';

export function updateCanvasChart(
  input: CanvasChartInput,
  _options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
): void {
  processState(stateWrapper);

  const { canvas } = input;

  const { layout, data, timezone, seriesPosition, priceRange } =
    stateWrapper.state;

  const { main: mainAreaRect, xAxis: xAxisRect, yAxis: yAxisRect } = layout;

  console.time('createExampleChart');

  // x-axis
  console.time('processTimeAxisData');
  const timeAxisInput: TimeAxisInput = {
    position: seriesPosition,
    axisLength: xAxisRect.width,
    data: data.items,
    interval: data.interval,
    timezone,
  };

  const xAxisData = processTimeAxisData(timeAxisInput);
  console.timeEnd('processTimeAxisData');
  // end x-axis

  // y-axis
  const pricePrecision = 1;

  const priceAxisInput: PriceAxisInput = {
    range: priceRange,
    axisLength: yAxisRect.height,
    pricePrecision,
  };

  const yAxisData = processPriceAxisData(priceAxisInput);
  // end y-axis

  const gridData: GridData = {
    xOffsets: xAxisData.map(({ offset }) => offset),
    yOffsets: yAxisData.map(({ offset }) => offset),
  };

  const candleSeriesData: CandleSeriesData = getOhlcSeriesValues(
    data.items,
    seriesPosition,
    mainAreaRect.width,
    priceRange,
    mainAreaRect.height,
  );

  const gridRenderer = createGridRenderer(mainAreaRect);

  const candleSeriesRenderer = createCandleSeriesRenderer(mainAreaRect);

  const xAxisRenderer = createHorizontalAxisRenderer(xAxisRect);

  const yAxisRenderer = createVerticalAxisRenderer(yAxisRect);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderers: readonly CanvasRenderer<any>[] = [
    gridRenderer,
    candleSeriesRenderer,
    xAxisRenderer,
    yAxisRenderer,
  ];

  gridRenderer.setData(gridData);
  candleSeriesRenderer.setData(candleSeriesData);
  xAxisRenderer.setData(xAxisData);
  yAxisRenderer.setData(yAxisData);

  const canvasRenderingPipelineOptions: CanvasRenderingPipelineOptions = {
    backgroundColor: '#161A25',
    renderers,
  };

  const renderingPipeline = createCanvasRenderingPipeline(
    canvas,
    canvasRenderingPipelineOptions,
  );

  console.timeEnd('createExampleChart');

  console.time('render');
  renderingPipeline.render();
  console.timeEnd('render');
}

function processState(stateWrapper: CanvasChartStateWrapper): void {
  const { state } = stateWrapper;

  stateWrapper.state = {
    ...state,
    seriesPosition: {
      ...state.seriesPosition,
      itemSpan: clamp(
        state.seriesPosition.itemSpan,
        MIN_ITEM_SPAN,
        MAX_ITEM_SPAN,
      ),
    },
  };
}

const MIN_ITEM_SPAN = 20;
const MAX_ITEM_SPAN = 500;
