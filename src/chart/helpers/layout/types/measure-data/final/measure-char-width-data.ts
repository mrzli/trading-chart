import { MeasureCharWidthDataType } from '../shared';

export interface MeasureCharWidthDataBase {
  readonly type: MeasureCharWidthDataType;
}

export interface MeasureCharWidthDataConstant extends MeasureCharWidthDataBase {
  readonly type: 'constant';
  readonly value: number;
}

export interface MeasureCharWidthDataVariable extends MeasureCharWidthDataBase {
  readonly type: 'variable';
  readonly value: ReadonlyMap<string, number>;
}

export type MeasureCharWidthData =
  | MeasureCharWidthDataConstant
  | MeasureCharWidthDataVariable;
