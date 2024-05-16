import { getPointDiff, getRelativeToElementPos } from '../../../../helpers';
import { Point } from '../../../../types';
import {
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartState,
  CanvasChartStateWrapper,
} from '../../../types';
import {
  getEventArea,
  processDragMain,
  processDragXAxis,
  processDragYAxis,
} from './shared';
import { CanvasChartEventStateWrapper } from './types';

export function createHandlerMouseMove(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
  eventStateWrapper: CanvasChartEventStateWrapper,
): (event: MouseEvent) => void {
  return (event: MouseEvent): void => {
    const drag = eventStateWrapper.state.drag;
    const pos: Point = getRelativeToElementPos(event);

    setCursor(input.canvas, stateWrapper.state, pos);

    if (drag.kind === 'none') {
      return;
    }

    const pixelDiff = getPointDiff(drag.pixelStart, pos);

    switch (drag.kind) {
      case 'main': {
        processDragMain(input, options, stateWrapper, drag, pixelDiff);
        break;
      }
      case 'x-axis': {
        processDragXAxis(input, options, stateWrapper, drag, pixelDiff);
        break;
      }
      case 'y-axis': {
        processDragYAxis(input, options, stateWrapper, drag, pixelDiff);
        break;
      }
    }
  };
}

function setCursor(
  canvas: HTMLCanvasElement,
  state: CanvasChartState,
  pos: Point,
): void {
  const eventArea = getEventArea(pos, state.layout);

  switch (eventArea) {
    case 'main': {
      canvas.style.cursor = 'default';
      break;
    }
    case 'x-axis': {
      canvas.style.cursor = 'ew-resize';
      break;
    }
    case 'y-axis': {
      canvas.style.cursor = 'ns-resize';
      break;
    }
    default: {
      canvas.style.cursor = 'default';
    }
  }
}
