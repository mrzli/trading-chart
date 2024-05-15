import { Range } from '../../../types';

export interface PriceAxisInput {
  readonly range: Range;
  readonly axisLength: number;
  readonly pricePrecision: number;
}
