export const LIST_OF_DRAW_PATH_COMMAND_KINDS = [
  'move-to',
  'line-to',
  'arc-to',
  'bezier-curve-to',
  'quadratic-curve-to',
  'rect',
  'round-rect-single-radius',
  'round-rect-multi-radius',
  'ellipse',
  'arc',
  'close-path',
] as const;

export type DrawPathCommandKind =
  (typeof LIST_OF_DRAW_PATH_COMMAND_KINDS)[number];

export interface DrawPathCommandBase {
  readonly kind: DrawPathCommandKind;
}

export interface DrawPathCommandMoveTo extends DrawPathCommandBase {
  readonly kind: 'move-to';
  readonly x: number;
  readonly y: number;
}

export interface DrawPathCommandLineTo extends DrawPathCommandBase {
  readonly kind: 'line-to';
  readonly x: number;
  readonly y: number;
}

export interface DrawPathCommandArcTo extends DrawPathCommandBase {
  readonly kind: 'arc-to';
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly radius: number;
}

export interface DrawPathCommandBezierCurveTo extends DrawPathCommandBase {
  readonly kind: 'bezier-curve-to';
  readonly cp1x: number;
  readonly cp1y: number;
  readonly cp2x: number;
  readonly cp2y: number;
  readonly x: number;
  readonly y: number;
}

export interface DrawPathCommandQuadraticCurveTo extends DrawPathCommandBase {
  readonly kind: 'quadratic-curve-to';
  readonly cpx: number;
  readonly cpy: number;
  readonly x: number;
  readonly y: number;
}

export interface DrawPathCommandRect extends DrawPathCommandBase {
  readonly kind: 'rect';
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export interface DrawPathCommandRoundRectSingleRadius
  extends DrawPathCommandBase {
  readonly kind: 'round-rect-single-radius';
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly radius: number;
}

export interface DrawPathCommandRoundRectMultiRadius
  extends DrawPathCommandBase {
  readonly kind: 'round-rect-multi-radius';
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly radii: readonly number[];
}

export interface DrawPathCommandEllipse extends DrawPathCommandBase {
  readonly kind: 'ellipse';
  readonly x: number;
  readonly y: number;
  readonly radiusX: number;
  readonly radiusY: number;
  readonly rotation: number;
  readonly startAngle: number;
  readonly endAngle: number;
  readonly counterclockwise: boolean;
}

export interface DrawPathCommandArc extends DrawPathCommandBase {
  readonly kind: 'arc';
  readonly x: number;
  readonly y: number;
  readonly radius: number;
  readonly startAngle: number;
  readonly endAngle: number;
  readonly counterClockwise: boolean;
}

export interface DrawPathCommandClosePath extends DrawPathCommandBase {
  readonly kind: 'close-path';
}

export type DrawPathCommand =
  | DrawPathCommandMoveTo
  | DrawPathCommandLineTo
  | DrawPathCommandArcTo
  | DrawPathCommandBezierCurveTo
  | DrawPathCommandQuadraticCurveTo
  | DrawPathCommandRect
  | DrawPathCommandRoundRectSingleRadius
  | DrawPathCommandRoundRectMultiRadius
  | DrawPathCommandEllipse
  | DrawPathCommandArc
  | DrawPathCommandClosePath;
