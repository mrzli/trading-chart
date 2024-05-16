import {
  CanvasChartData,
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../types';
import { updateCanvasChart } from './update';

export function setCanvasChartData(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
  data: CanvasChartData,
): void {
  stateWrapper.state = {
    ...stateWrapper.state,
    data,
  };

  updateCanvasChart(input, options, stateWrapper);
}
