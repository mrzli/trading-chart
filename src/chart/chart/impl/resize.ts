import { Size } from '../../types';
import {
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../types';
import { getChartLayout } from './layout';
import { updateCanvasChart } from './update';

export function resizeCanvasChart(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
  size: Size,
): void {
  const layout = getChartLayout(
    input.canvas,
    size,
    12,
    stateWrapper.state.priceRange,
    1,
  );

  stateWrapper.state = {
    ...stateWrapper.state,
    size,
    layout,
  };

  updateCanvasChart(input, options, stateWrapper);
}
