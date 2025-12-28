import { DateObjectTz } from '@gmjs/date-util';

export interface TimeAxisOutputItem {
  readonly offset: number;
  readonly value: number;
  readonly dateObject: DateObjectTz;
  readonly label: string;
}
