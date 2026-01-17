import { TimeAxisExtendedDataItem } from './time-axis-extended-data-item';
import { TimeAxisInput } from './time-axis-input';
import { TimeTickTimeframe } from './time-tick-timeframe';

export interface TimeAxisProcessInput {
  readonly timeAxisInput: TimeAxisInput;
  readonly extendedItems: readonly TimeAxisExtendedDataItem[];
  readonly timeTickTimeframe: TimeTickTimeframe;
  readonly minTickItemDistance: number;
}
