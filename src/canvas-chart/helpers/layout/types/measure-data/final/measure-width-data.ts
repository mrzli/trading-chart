import { MeasureWidthDataType } from '../shared';
import { MeasureCharWidthData } from './measure-char-width-data';

export interface MeasureWidthDataBase {
  readonly type: MeasureWidthDataType;
}

export interface MeasureWidthDataProportional extends MeasureWidthDataBase {
  readonly type: 'proportional';
  readonly value: ReadonlyMap<string, MeasureCharWidthData>;
}

export interface MeasureWidthDataMonospaced extends MeasureWidthDataBase {
  readonly type: 'monospaced';
  readonly value: number;
}

export type MeasureWidthData =
  | MeasureWidthDataProportional
  | MeasureWidthDataMonospaced;
