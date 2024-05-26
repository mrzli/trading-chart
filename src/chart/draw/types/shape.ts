export const LIST_OF_SHAPE_DRAW_TYPES = [
  'fill',
  'stroke',
  'fill-and-stroke',
] as const;

export type ShapeDrawType = (typeof LIST_OF_SHAPE_DRAW_TYPES)[number];

export interface ShapeParametersBase {
  readonly drawType: ShapeDrawType;
  readonly strokeColor?: string;
  readonly strokeThickness?: number;
  readonly strokeDashPattern?: readonly number[];
  readonly strokeDashOffset?: number;
  readonly fillColor?: string;
}
