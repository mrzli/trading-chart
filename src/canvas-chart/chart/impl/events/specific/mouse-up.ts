import { getPointDiff, getRelativeToElementPos } from '../../../../helpers';
import { Point } from '../../../../types';
import {
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../../../types';
import { processDragMain, processDragYAxis } from './shared';
import { CanvasChartEventStateWrapper } from './types';

export function createHandlerMouseUp(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
  eventStateWrapper: CanvasChartEventStateWrapper,
): (event: MouseEvent) => void {
  return (event: MouseEvent): void => {
    const drag = eventStateWrapper.state.drag;
    if (drag.kind === 'none') {
      return;
    }

    const pos: Point = getRelativeToElementPos(event);
    const pixelDiff = getPointDiff(drag.pixelStart, pos);

    switch (drag.kind) {
      case 'main': {
        processDragMain(input, options, stateWrapper, drag, pixelDiff);
        break;
      }
      case 'y-axis': {
        processDragYAxis(input, options, stateWrapper, drag, pixelDiff);
        break;
      }
    }

    eventStateWrapper.state = {
      ...eventStateWrapper.state,
      drag: {
        kind: 'none',
      },
    };
  };
}
