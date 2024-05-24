import { CanvasChartEventHandlers } from '../../types';

export function registerCanvasChartEvents(
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
    canvas.addEventListener('mouseenter', onMouseEnter);
  }

  if (onMouseLeave) {
    canvas.addEventListener('mouseleave', onMouseLeave);
  }

  if (onMouseOver) {
    canvas.addEventListener('mouseover', onMouseOver);
  }

  if (onMouseOut) {
    canvas.addEventListener('mouseout', onMouseOut);
  }

  if (onMouseMove) {
    canvas.addEventListener('mousemove', onMouseMove);
  }

  if (onMouseDown) {
    canvas.addEventListener('mousedown', onMouseDown);
  }

  if (onMouseUp) {
    canvas.addEventListener('mouseup', onMouseUp);
  }

  if (onClick) {
    canvas.addEventListener('click', onClick);
  }

  if (onDoubleClick) {
    canvas.addEventListener('dblclick', onDoubleClick);
  }

  if (onContextMenu) {
    canvas.addEventListener('contextmenu', onContextMenu);
  }

  if (onWheel) {
    canvas.addEventListener('wheel', onWheel, { passive: true });
  }

  if (onKeyDown) {
    canvas.addEventListener('keydown', onKeyDown);
  }

  if (onKeyUp) {
    canvas.addEventListener('keyup', onKeyUp);
  }

  if (onKeyPress) {
    canvas.addEventListener('keypress', onKeyPress);
  }
}
