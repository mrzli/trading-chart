import { MeasureCharWidthDataType } from '../shared';

export interface RawMeasureCharWidthDataBase {
  readonly type: MeasureCharWidthDataType;
}

export interface RawMeasureCharWidthDataConstant
  extends RawMeasureCharWidthDataBase {
  readonly type: 'constant';
  readonly value: number;
}

export interface RawMeasureCharWidthDataVariable
  extends RawMeasureCharWidthDataBase {
  readonly type: 'variable';
  readonly value: readonly RawMeasureCharBeforeCharWidthMapping[];
}

export type RawMeasureCharBeforeCharWidthMapping = readonly [string, number];

export type RawMeasureCharWidthData =
  | RawMeasureCharWidthDataConstant
  | RawMeasureCharWidthDataVariable;
