import { applyFn } from '@gmjs/apply-function';
import {
  PriceAxisInput,
  TickValue,
  TimeAxisOutputItem,
  formatPrice,
  getPriceAxisTickValues,
  getTimeAxisTickValues,
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
import { map, toArray } from '@gmjs/value-transformers';
import { PriceAxisOutputItem } from '../../axis/price/types/price-axis-output-item';
import { TimeAxisInput } from '../../axis/time/types/time-axis-input';
import { clamp } from '@gmjs/number-util';

export function updateCanvasChart(
  input: CanvasChartInput,
  _options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
): void {
  processState(stateWrapper);

  const { canvas } = input;

  const { layout, data, seriesPosition, priceRange } = stateWrapper.state;

  const { main: mainAreaRect, xAxis: xAxisRect, yAxis: yAxisRect } = layout;

  console.time('createExampleChart');

  // x-axis
  const timeAxisInput: TimeAxisInput = {
    position: seriesPosition,
    axisLength: xAxisRect.width,
    data: data.items,
  };

  const xAxisData = applyFn(
    timeAxisInput,
    (v) => getTimeAxisTickValues(v),
    map<TickValue, TimeAxisOutputItem>((v, i) => ({
      offset: v.offset,
      value: v.value,
      label: (i % 10).toString(),
    })),
    toArray(),
  );

  console.log(xAxisData);
  // end x-axis

  // y-axis
  const pricePrecision = 1;

  const priceAxisInput: PriceAxisInput = {
    range: priceRange,
    axisLength: yAxisRect.height,
    pricePrecision,
  };

  const yAxisData = applyFn(
    priceAxisInput,
    (v) => getPriceAxisTickValues(v),
    map<TickValue, PriceAxisOutputItem>((v) => ({
      offset: v.offset,
      value: v.value,
      label: formatPrice(priceAxisInput, v),
    })),
    toArray(),
  );
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
      itemSpan: clamp(state.seriesPosition.itemSpan, MIN_ITEM_SPAN, MAX_ITEM_SPAN),
    },
  };
}

const MIN_ITEM_SPAN = 20;
const MAX_ITEM_SPAN = 500;
