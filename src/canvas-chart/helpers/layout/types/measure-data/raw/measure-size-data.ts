import { RawMeasureHeightData } from './measure-height-data';
import { RawMeasureWidthData } from './measure-width-data';

export interface RawMeasureSizeData {
  readonly width: RawMeasureWidthData;
  readonly height: RawMeasureHeightData;
}
