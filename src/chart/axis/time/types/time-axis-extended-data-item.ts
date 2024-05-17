import { DateObjectTz } from '@gmjs/date-util';

export interface TimeAxisExtendedDataItem {
  readonly offset: number;
  readonly value: number;
  readonly dateObject: DateObjectTz;
  readonly previousDateObject: DateObjectTz | undefined;
}
