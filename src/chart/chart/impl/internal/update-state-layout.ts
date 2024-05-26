import {
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../../types';
import { getChartLayout } from '../layout';

export function updateStateLayout(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
): void {
  const { size, priceRange, pricePrecision } = stateWrapper.state;

  const layout = getChartLayout(
    input.canvas,
    size,
    options.fontSize,
    priceRange,
    pricePrecision,
  );

  stateWrapper.state = {
    ...stateWrapper.state,
    size,
    layout,
  };
}
