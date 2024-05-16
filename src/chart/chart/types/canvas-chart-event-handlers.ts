export type CanvasChartEventHandlers = CanvasChartMouseEventHandlers &
  CanvasChartKeyboardEventHandlers;

export interface CanvasChartMouseEventHandlers {
  // mouse enters the canvas (the event does not bubble)
  readonly onMouseEnter?: (e: MouseEvent) => void;
  // mouse leaves the canvas (the event does not bubble)
  readonly onMouseLeave?: (e: MouseEvent) => void;
  // mouse enters then canvas
  readonly onMouseOver?: (e: MouseEvent) => void;
  // mouse leaves the canvas
  readonly onMouseOut?: (e: MouseEvent) => void;
  // mouse moves over the canvas
  readonly onMouseMove?: (e: MouseEvent) => void;
  // mouse press over the canvas
  readonly onMouseDown?: (e: MouseEvent) => void;
  // mouse release over the canvas
  readonly onMouseUp?: (e: MouseEvent) => void;
  // mouse click over the canvas
  readonly onClick?: (e: MouseEvent) => void;
  // mouse double click over the canvas
  readonly onDoubleClick?: (e: MouseEvent) => void;
  // mouse right click over the canvas
  readonly onContextMenu?: (e: MouseEvent) => void;
  // mouse wheel over the canvas
  readonly onWheel?: (e: WheelEvent) => void;
}

export interface CanvasChartKeyboardEventHandlers {
  // key press over the canvas
  readonly onKeyDown?: (e: KeyboardEvent) => void;
  // key release over the canvas
  readonly onKeyUp?: (e: KeyboardEvent) => void;
  // key press and hold over the canvas
  readonly onKeyPress?: (e: KeyboardEvent) => void;
}
