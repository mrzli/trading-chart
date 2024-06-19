import {
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../../../types';
import { CanvasChartEventStateWrapper } from './types';

export function createHandlerKeyUp(
  _input: CanvasChartInput,
  _options: CanvasChartOptions,
  _stateWrapper: CanvasChartStateWrapper,
  _eventStateWrapper: CanvasChartEventStateWrapper,
): (event: KeyboardEvent) => void {
  return (_event: KeyboardEvent): void => {
    // console.log('key-up', event);
  };
}
