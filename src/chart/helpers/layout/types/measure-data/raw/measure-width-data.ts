import { MeasureWidthDataType } from '../shared';
import { RawMeasureCharWidthEntry } from './measure-char-width-entry';

export interface RawMeasureWidthDataBase {
  readonly type: MeasureWidthDataType;
}

export interface RawMeasureWidthDataProportional
  extends RawMeasureWidthDataBase {
  readonly type: 'proportional';
  readonly value: readonly RawMeasureCharWidthEntry[];
}

export interface RawMeasureWidthDataMonospaced extends RawMeasureWidthDataBase {
  readonly type: 'monospaced';
  readonly value: number;
}

export type RawMeasureWidthData =
  | RawMeasureWidthDataProportional
  | RawMeasureWidthDataMonospaced;
