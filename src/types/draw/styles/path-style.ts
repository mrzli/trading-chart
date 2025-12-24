import { LineCap, LineJoin } from '../simple-types';

export interface PathStyle {
  readonly lineWidth?: number;
  readonly lineCap?: LineCap;
  readonly lineJoin?: LineJoin;
  readonly miterLimit?: number;
  readonly lineDash?: readonly number[];
  readonly lineDashOffset?: number;
}
