import { TimeAxisExtendedDataItem } from './time-axis-extended-data-item';
import { TimeAxisInput } from './time-axis-input';
import { TimeTickTimeframe } from './time-tick-interval';

export interface TimeAxisProcessInput {
  readonly timeAxisInput: TimeAxisInput;
  readonly extendedItems: readonly TimeAxisExtendedDataItem[];
  readonly timeTickInterval: TimeTickTimeframe;
  readonly minTickItemDistance: number;
}
