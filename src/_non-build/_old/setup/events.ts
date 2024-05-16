import { CanvasChartEventHandlers } from './types';

export function registerEvents(
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
    canvas.addEventListener('wheel', onWheel);
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

export function unregisterEvents(
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
