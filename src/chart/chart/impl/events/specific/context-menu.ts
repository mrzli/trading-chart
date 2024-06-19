import {
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../../../types';
import { CanvasChartEventStateWrapper } from './types';

export function createHandlerContextMenu(
  _input: CanvasChartInput,
  _options: CanvasChartOptions,
  _stateWrapper: CanvasChartStateWrapper,
  _eventStateWrapper: CanvasChartEventStateWrapper,
): (event: MouseEvent) => void {
  return (_event: MouseEvent): void => {
    // console.log('context-menu', event);
  };
}
