/**
 * Map - font-family -> MeasureFontSizeData
 * MeasureSizeData { width: MeasureFontWidthData; height: MeasureFontHeightData; }
 */

import { MeasureWidthData } from './measure-width-data';
import { MeasureHeightData } from './measure-height-data';

export interface MeasureSizeData {
  readonly width: MeasureWidthData;
  readonly height: MeasureHeightData;
}
