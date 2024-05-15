import { CanvasChartEventHandlers } from '../../types';

export function unregisterCanvasChartEvents(
  canvas: HTMLCanvasElement,
  handlers: CanvasChartEventHandlers,
): void {
  const {
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    onMouseOut,
    onMouseMove,
    onMouseDown,
    onMouseUp,
    onClick,
    onDoubleClick,
    onContextMenu,
    onWheel,
    onKeyDown,
    onKeyUp,
    onKeyPress,
  } = handlers;

  if (onMouseEnter) {
    canvas.removeEventListener('mouseenter', onMouseEnter);
  }

  if (onMouseLeave) {
    canvas.removeEventListener('mouseleave', onMouseLeave);
  }

  if (onMouseOver) {
    canvas.removeEventListener('mouseover', onMouseOver);
  }

  if (onMouseOut) {
    canvas.removeEventListener('mouseout', onMouseOut);
  }

  if (onMouseMove) {
    canvas.removeEventListener('mousemove', onMouseMove);
  }

  if (onMouseDown) {
    canvas.removeEventListener('mousedown', onMouseDown);
  }

  if (onMouseUp) {
    canvas.removeEventListener('mouseup', onMouseUp);
  }

  if (onClick) {
    canvas.removeEventListener('click', onClick);
  }

  if (onDoubleClick) {
    canvas.removeEventListener('dblclick', onDoubleClick);
  }

  if (onContextMenu) {
    canvas.removeEventListener('contextmenu', onContextMenu);
  }

  if (onWheel) {
    canvas.removeEventListener('wheel', onWheel);
  }

  if (onKeyDown) {
    canvas.removeEventListener('keydown', onKeyDown);
  }

  if (onKeyUp) {
    canvas.removeEventListener('keyup', onKeyUp);
  }

  if (onKeyPress) {
    canvas.removeEventListener('keypress', onKeyPress);
  }
}
