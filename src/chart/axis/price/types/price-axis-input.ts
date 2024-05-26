import { Range } from '../../../types';

export interface PriceAxisInput {
  readonly minTickDistance: number;
  readonly range: Range;
  readonly axisLength: number;
  readonly pricePrecision: number;
}
