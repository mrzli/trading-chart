import { TickValue } from '../../types';

export interface TimeAxisTickValueData {
  readonly beforeFirstTime: number | undefined;
  readonly tickValues: readonly TickValue[];
}
