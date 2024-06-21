import { createCursorRenderer } from './../../specific-renderers/cursor/cursor-renderer';
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
  CursorRendererData,
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
import { processState, updateStateLayout } from './internal';

export function updateCanvasChart(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
): void {
  processState(stateWrapper);
  updateStateLayout(input, options, stateWrapper);

  const { canvas } = input;

  const { minXAxisTickDistance, minYAxisTickDistance } = options;

  const { layout, data, timezone, seriesPosition, priceRange, cursorState } =
    stateWrapper.state;

  const {
    full: fullRect,
    main: mainAreaRect,
    xAxis: xAxisRect,
    yAxis: yAxisRect,
  } = layout;

  if (SHOW_PERFORMANCE) {
    console.time('createExampleChart');
  }

  // x-axis
  if (SHOW_PERFORMANCE) {
    console.time('processTimeAxisData');
  }
  const timeAxisInput: TimeAxisInput = {
    minTickDistance: minXAxisTickDistance,
    position: seriesPosition,
    axisLength: xAxisRect.width,
    data: data.items,
    interval: data.interval,
    timezone,
  };

  const xAxisData = processTimeAxisData(timeAxisInput);
  if (SHOW_PERFORMANCE) {
    console.timeEnd('processTimeAxisData');
  }
  // end x-axis

  // y-axis
  const pricePrecision = 1;

  const priceAxisInput: PriceAxisInput = {
    minTickDistance: minYAxisTickDistance,
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

  // cursor

  const cursorData: CursorRendererData = {
    areas: layout,
    chartData: data,
    seriesPosition,
    timezone,
    priceRange,
    pricePrecision,
    cursorState,
  };
  // end cursor

  const gridRenderer = createGridRenderer(mainAreaRect);

  const candleSeriesRenderer = createCandleSeriesRenderer(mainAreaRect);

  const xAxisRenderer = createHorizontalAxisRenderer(xAxisRect);

  const yAxisRenderer = createVerticalAxisRenderer(yAxisRect);

  const cursorRenderer = createCursorRenderer(fullRect);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderers: readonly CanvasRenderer<any>[] = [
    gridRenderer,
    candleSeriesRenderer,
    xAxisRenderer,
    yAxisRenderer,
    cursorRenderer,
  ];

  gridRenderer.setData(gridData);
  candleSeriesRenderer.setData(candleSeriesData);
  xAxisRenderer.setData(xAxisData);
  yAxisRenderer.setData(yAxisData);
  cursorRenderer.setData(cursorData);

  const canvasRenderingPipelineOptions: CanvasRenderingPipelineOptions = {
    backgroundColor: '#161A25',
    renderers,
  };

  const renderingPipeline = createCanvasRenderingPipeline(
    canvas,
    canvasRenderingPipelineOptions,
  );

  if (SHOW_PERFORMANCE) {
    console.timeEnd('createExampleChart');
  }

  if (SHOW_PERFORMANCE) {
    console.time('render');
  }
  renderingPipeline.render();
  if (SHOW_PERFORMANCE) {
    console.timeEnd('render');
  }
}

const SHOW_PERFORMANCE = false;
