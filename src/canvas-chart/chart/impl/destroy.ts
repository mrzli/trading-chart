import {
  CanvasChartEventHandlers,
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../types';
import { unregisterCanvasChartEvents } from './events';

export function destroyCanvasChart(
  input: CanvasChartInput,
  _options: CanvasChartOptions,
  _stateWrapper: CanvasChartStateWrapper,
  eventHandlers: CanvasChartEventHandlers,
): void {
  const { canvas } = input;

  unregisterCanvasChartEvents(canvas, eventHandlers);
}
