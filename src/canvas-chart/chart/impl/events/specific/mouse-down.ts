import { getRelativeToElementPos } from '../../../../helpers';
import { Point } from '../../../../types';
import {
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../../../types';
import { getEventArea } from './shared';
import { CanvasChartEventStateWrapper } from './types';

export function createHandlerMouseDown(
  _input: CanvasChartInput,
  _options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
  eventStateWrapper: CanvasChartEventStateWrapper,
): (event: MouseEvent) => void {
  return (event: MouseEvent): void => {
    const pos: Point = getRelativeToElementPos(event);
    const eventArea = getEventArea(pos, stateWrapper.state.layout);

    if (
      eventArea !== 'main' &&
      eventArea !== 'x-axis' &&
      eventArea !== 'y-axis'
    ) {
      eventStateWrapper.state = {
        ...eventStateWrapper.state,
        drag: {
          kind: 'none',
        },
      };
      return;
    }

    eventStateWrapper.state = {
      ...eventStateWrapper.state,
      drag: {
        kind: eventArea,
        pixelStart: pos,
        positionStart: stateWrapper.state.seriesPosition,
        priceRangeStart: stateWrapper.state.priceRange,
      },
    };
  };
}
