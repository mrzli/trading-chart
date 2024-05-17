import {
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../types';
import { updateCanvasChart } from './update';

export function setCanvasChartTimezone(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
  timezone: string,
): void {
  stateWrapper.state = {
    ...stateWrapper.state,
    timezone,
  };

  updateCanvasChart(input, options, stateWrapper);
}
