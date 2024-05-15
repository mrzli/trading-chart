export type RawMeasureHeightMapping = readonly [number, number];

export interface RawMeasureHeightData {
  readonly mapping: readonly RawMeasureHeightMapping[];
  readonly factor: number;
}
