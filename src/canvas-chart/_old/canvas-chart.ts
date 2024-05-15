import { invariant } from '@gmjs/assert';
import {
  toFinalChartOptions,
  registerEvents as registerEventsImpl,
  unregisterEvents as unregisterEventsImpl,
  CanvasChartOptions,
} from './setup';
import { redrawChart } from './chart';

export interface CanvasChart {
  readonly registerEvents: () => void;
  readonly unregisterEvents: () => void;
  readonly render: () => void;
}

export function createCanvasChart(
  canvas: HTMLCanvasElement,
  options?: CanvasChartOptions,
): CanvasChart {
  const finalOptions = toFinalChartOptions(canvas, options);
  const { eventHandlers } = finalOptions;

  const c = canvas.getContext('2d');
  invariant(c !== null, 'CanvasRenderingContext2D is null.');

  const registerEvents = (): void => {
    registerEventsImpl(canvas, eventHandlers);
  };

  const unregisterEvents = (): void => {
    unregisterEventsImpl(canvas, eventHandlers);
  };

  const render = (): void => {
    redrawChart(c, finalOptions, { x: 400, y: 200 });
  };

  return {
    registerEvents,
    unregisterEvents,
    render,
  };
}
