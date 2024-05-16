import {
  CanvasChartEventHandlers,
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../../types';
import {
  CanvasChartEventState,
  CanvasChartEventStateWrapper,
  createHandlerClick,
  createHandlerContextMenu,
  createHandlerDoubleClick,
  createHandlerKeyDown,
  createHandlerKeyUp,
  createHandlerMouseDown,
  createHandlerMouseMove,
  createHandlerMouseUp,
  createHandlerWheel,
} from './specific';

export function createCanvasChartEventHandlers(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
): CanvasChartEventHandlers {
  const eventStateWrapper: CanvasChartEventStateWrapper = {
    state: getInitialEventState(),
  };

  const eventHandlers: CanvasChartEventHandlers = {
    onMouseMove: createHandlerMouseMove(
      input,
      options,
      stateWrapper,
      eventStateWrapper,
    ),
    onMouseDown: createHandlerMouseDown(
      input,
      options,
      stateWrapper,
      eventStateWrapper,
    ),
    onMouseUp: createHandlerMouseUp(
      input,
      options,
      stateWrapper,
      eventStateWrapper,
    ),
    onClick: createHandlerClick(
      input,
      options,
      stateWrapper,
      eventStateWrapper,
    ),
    onDoubleClick: createHandlerDoubleClick(
      input,
      options,
      stateWrapper,
      eventStateWrapper,
    ),
    onContextMenu: createHandlerContextMenu(
      input,
      options,
      stateWrapper,
      eventStateWrapper,
    ),
    onWheel: createHandlerWheel(
      input,
      options,
      stateWrapper,
      eventStateWrapper,
    ),
    onKeyDown: createHandlerKeyDown(
      input,
      options,
      stateWrapper,
      eventStateWrapper,
    ),
    onKeyUp: createHandlerKeyUp(
      input,
      options,
      stateWrapper,
      eventStateWrapper,
    ),
  };

  return eventHandlers;
}

function getInitialEventState(): CanvasChartEventState {
  return {
    drag: {
      kind: 'none',
    },
  };
}
