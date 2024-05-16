/* eslint-disable unicorn/consistent-function-scoping */
import { invariant } from '@gmjs/assert';
import { Point, Rect, Size } from '../../types';
import {
  drawHorizontalLine,
  HorizontalLineParameters,
  VerticalLineParameters,
  drawVerticalLine,
  HorizontalLinesParameters,
  drawHorizontalLines,
  VerticalLinesParameters,
  drawVerticalLines,
  LineGridParameters,
  drawLineGrid,
  drawRect,
  RectParameters,
  CandleParameters,
  drawCandle,
  TextParameters,
  drawText,
} from '../../draw';
import {
  toFinalChartOptions,
  registerEvents as registerEventsImpl,
  unregisterEvents as unregisterEventsImpl,
  CanvasChartOptions,
  FinalCanvasChartOptions,
} from '../setup';
import { CandleSeriesItem, drawCandleSeries } from '../../draw/series';
import { range } from '@gmjs/array-create';
import { CanvasChart, createCanvasChart } from '../canvas-chart';

export function createExampleCanvasChart(
  canvas: HTMLCanvasElement,
): CanvasChart {
  const c = canvas.getContext('2d');
  invariant(c !== null, 'CanvasRenderingContext2D is null.');

  const canvasSize: Size = {
    width: canvas.width,
    height: canvas.height,
  };

  const onMouseEnter = (e: MouseEvent): void => {
    // console.log('onMouseEnter', e);
    // const pos = getElementPos(e);
    // redraw(c, canvasSize, pos);
  };

  const onMouseLeave = (e: MouseEvent): void => {
    // console.log('onMouseLeave', e);
    // redraw(c, canvasSize, undefined);
  };

  const onMouseOver = (e: MouseEvent): void => {
    // // console.log('onMouseOver', e);
  };

  const onMouseOut = (e: MouseEvent): void => {
    // // console.log('onMouseOut', e);
  };

  const onMouseMove = (e: MouseEvent): void => {
    // // console.log('onMouseMove', e);
    // const pos = getElementPos(e);
    // redraw(c, canvasSize, pos);
  };

  const onMouseDown = (e: MouseEvent): void => {
    // // console.log('onMouseDown', e);
  };

  const onMouseUp = (e: MouseEvent): void => {
    // // console.log('onMouseUp', e);
  };

  const onClick = (e: MouseEvent): void => {
    // // console.log('onClick', e);
  };

  const onDoubleClick = (e: MouseEvent): void => {
    // // console.log('onDoubleClick', e);
  };

  const onContextMenu = (e: MouseEvent): void => {
    // // console.log('onContextMenu', e);
  };

  const onWheel = (e: WheelEvent): void => {
    // console.log('onWheel', e);
  };

  const onKeyDown = (e: KeyboardEvent): void => {
    // console.log('onKeyDown', e);
  };

  const onKeyUp = (e: KeyboardEvent): void => {
    // console.log('onKeyUp', e);
  };

  const onKeyPress = (e: KeyboardEvent): void => {
    // console.log('onKeyPress', e);
  };

  const options: CanvasChartOptions = {
    backgroundColor: undefined, // 'rgba(0, 0, 0, 0.1)',
    contentPadding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
    xAxisAreaHeight: 100,
    yAxisAreaWidth: 100,
    eventHandlers: {
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onMouseOut,
      onMouseMove,
      onMouseDown,
      onMouseUp,
      onClick,
      onDoubleClick,
      onContextMenu,
      onWheel,
      onKeyDown,
      onKeyUp,
      onKeyPress,
    },
  };

  return createCanvasChart(canvas, options);
}
