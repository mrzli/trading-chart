import {
  CursorRendererDataItem,
  createCursorRenderer,
} from './../../specific-renderers/cursor/cursor-renderer';
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
import { processState } from './internal';

export function updateCanvasChart(
  input: CanvasChartInput,
  _options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
): void {
  processState(stateWrapper);

  const { canvas } = input;

  const { layout, data, timezone, seriesPosition, priceRange } =
    stateWrapper.state;

  const {
    full: fullRect,
    main: mainAreaRect,
    xAxis: xAxisRect,
    yAxis: yAxisRect,
  } = layout;

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

  // cursor
  const cursorItems: readonly CursorRendererDataItem[] = [];

  const cursorData: CursorRendererData = {
    areas: layout,
    items: cursorItems,
    priceRange,
    seriesPosition,
    cursorState: stateWrapper.state.cursorState,
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

  console.timeEnd('createExampleChart');

  console.time('render');
  renderingPipeline.render();
  console.timeEnd('render');
}
