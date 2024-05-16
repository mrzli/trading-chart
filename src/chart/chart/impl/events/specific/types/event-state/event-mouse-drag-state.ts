import { Point, Range, SeriesPosition } from '../../../../../../types';

export const LIST_OF_EVENT_MOUSE_DRAG_STATE_KINDS = [
  'none',
  'main',
  'x-axis',
  'y-axis',
] as const;

export type EventMouseDragStateKind =
  (typeof LIST_OF_EVENT_MOUSE_DRAG_STATE_KINDS)[number];

export interface EventMouseDragStateBase {
  readonly kind: EventMouseDragStateKind;
}

export interface EventMouseDragStateNone extends EventMouseDragStateBase {
  readonly kind: 'none';
}

export interface EventMouseDragStateMain extends EventMouseDragStateBase {
  readonly kind: 'main';
  readonly pixelStart: Point;
  readonly positionStart: SeriesPosition;
  readonly priceRangeStart: Range;
}

export interface EventMouseDragStateXAxis extends EventMouseDragStateBase {
  readonly kind: 'x-axis';
  readonly pixelStart: Point;
  readonly positionStart: SeriesPosition;
  readonly priceRangeStart: Range;
}

export interface EventMouseDragStateYAxis extends EventMouseDragStateBase {
  readonly kind: 'y-axis';
  readonly pixelStart: Point;
  readonly positionStart: SeriesPosition;
  readonly priceRangeStart: Range;
}

export type EventMouseDragState =
  | EventMouseDragStateNone
  | EventMouseDragStateMain
  | EventMouseDragStateXAxis
  | EventMouseDragStateYAxis;
