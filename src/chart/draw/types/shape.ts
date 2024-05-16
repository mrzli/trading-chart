export type ShapeDrawType = 'fill' | 'stroke' | 'fill-and-stroke';

export interface ShapeParametersBase {
  readonly drawType: ShapeDrawType;
  readonly strokeColor?: string;
  readonly strokeThickness?: number;
  readonly strokeDashPattern?: readonly number[];
  readonly strokeDashOffset?: number;
  readonly fillColor?: string;
}
