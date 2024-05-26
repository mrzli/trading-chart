import { Size } from '../../types';
import {
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../types';
import { updateCanvasChart } from './update';

export function resizeCanvasChart(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
  size: Size,
): void {
  stateWrapper.state = {
    ...stateWrapper.state,
    size,
  };

  updateCanvasChart(input, options, stateWrapper);
}
