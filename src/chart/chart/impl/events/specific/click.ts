import {
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../../../types';
import { CanvasChartEventStateWrapper } from './types';

export function createHandlerClick(
  _input: CanvasChartInput,
  _options: CanvasChartOptions,
  _stateWrapper: CanvasChartStateWrapper,
  _eventStateWrapper: CanvasChartEventStateWrapper,
): (event: MouseEvent) => void {
  return (_event: MouseEvent): void => {
    // console.log('click', event);
  };
}
