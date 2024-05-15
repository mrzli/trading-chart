import { Size } from '../../types';
import { CanvasChartOptions, FinalCanvasChartOptions } from './types';

export function toFinalChartOptions(
  canvas: HTMLCanvasElement,
  options?: CanvasChartOptions,
): FinalCanvasChartOptions {
  options = options ?? {};

  const canvasSize: Size = {
    width: canvas.width,
    height: canvas.height,
  };

  return {
    canvasSize,
    backgroundColor: options.backgroundColor,
    contentPadding: options.contentPadding ?? {
      left: 20,
      right: 30,
      top: 40,
      bottom: 50,
    },
    xAxisAreaHeight: options.xAxisAreaHeight ?? 100,
    yAxisAreaWidth: options.yAxisAreaWidth ?? 100,
    eventHandlers: options.eventHandlers ?? {},
  };
}
