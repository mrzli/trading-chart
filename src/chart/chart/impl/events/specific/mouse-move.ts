import {
  getPointDiff,
  getRelativeToElementPos,
  pixelToPrice,
  pixelToSeriesIndexFractional,
} from '../../../../helpers';
import { Point } from '../../../../types';
import {
  CanvasChartCursorState,
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartState,
  CanvasChartStateWrapper,
} from '../../../types';
import { updateCanvasChart } from '../../update';
import {
  getEventArea,
  processDragMain,
  processDragXAxis,
  processDragYAxis,
} from './shared';
import { CanvasChartEventStateWrapper, EventArea } from './types';

export function createHandlerMouseMove(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
  eventStateWrapper: CanvasChartEventStateWrapper,
): (event: MouseEvent) => void {
  return (event: MouseEvent): void => {
    const pos: Point = getRelativeToElementPos(event);
    const eventArea = getEventArea(pos, stateWrapper.state.layout);

    setCursor(input.canvas, stateWrapper.state, pos);
    handleMove(input, options, stateWrapper, eventStateWrapper, pos, eventArea);
    handleDrag(input, options, stateWrapper, eventStateWrapper, pos);

    updateCanvasChart(input, options, stateWrapper);
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
      canvas.style.cursor = 'crosshair';
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

function handleMove(
  _input: CanvasChartInput,
  _options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
  _eventStateWrapper: CanvasChartEventStateWrapper,
  pos: Point,
  eventArea: EventArea,
): void {
  const cursorState = getCursorState(stateWrapper, pos, eventArea);

  stateWrapper.state = {
    ...stateWrapper.state,
    cursorState,
  };
}

function getCursorState(
  stateWrapper: CanvasChartStateWrapper,
  pos: Point,
  eventArea: EventArea,
): CanvasChartCursorState | undefined {
  if (eventArea !== 'main') {
    return undefined;
  }

  const { layout, priceRange, seriesPosition } = stateWrapper.state;

  const price = pixelToPrice(pos.y, layout.yAxis.height, priceRange);
  const seriesItemIndex = pixelToSeriesIndexFractional(
    pos.x,
    layout.xAxis.width,
    seriesPosition,
  );

  return {
    pixelPosition: pos,
    price,
    seriesItemIndex,
  };
}

function handleDrag(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
  eventStateWrapper: CanvasChartEventStateWrapper,
  pos: Point,
): void {
  const drag = eventStateWrapper.state.drag;

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
}
