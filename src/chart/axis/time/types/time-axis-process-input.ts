import { TimeDisplayType } from '../04-output/types';
import { TimeAxisExtendedDataItem } from './time-axis-extended-data-item';
import { TimeAxisInput } from './time-axis-input';
import { TimeTickInterval } from './time-tick-interval';

export interface TimeAxisProcessInput {
  readonly timeAxisInput: TimeAxisInput;
  readonly extendedItems: readonly TimeAxisExtendedDataItem[];
  readonly timeTickInterval: TimeTickInterval;
  readonly existingTicks: readonly TimeDisplayType[];
}
