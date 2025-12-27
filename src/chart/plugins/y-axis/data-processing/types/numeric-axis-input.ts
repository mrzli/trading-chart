import { Range } from '../../../../../types';

export interface NumericAxisInput {
  readonly minTickDistance: number;
  readonly range: Range;
  readonly axisLength: number;
  readonly precision: number;
  readonly tickSize: number;
}
