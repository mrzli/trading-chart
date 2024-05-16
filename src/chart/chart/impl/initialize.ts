import {
  CanvasChartEventHandlers,
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../types';
import { registerCanvasChartEvents } from './events';

export function initializeCanvasChart(
  input: CanvasChartInput,
  _options: CanvasChartOptions,
  _stateWrapper: CanvasChartStateWrapper,
  eventHandlers: CanvasChartEventHandlers,
): void {
  const { canvas } = input;

  registerCanvasChartEvents(canvas, eventHandlers);
}
