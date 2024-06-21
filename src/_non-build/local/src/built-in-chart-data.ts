import { isoDateTimeToUnixSeconds } from '@gmjs/date-util';
import { CanvasChartData, Interval } from '../../../chart';
import {
  convertRawOhlcDataToInterval,
  TEST_RAW_OHLC_DATA,
} from '../../test-data';

export async function getChartData(): Promise<CanvasChartData> {
  const startDate = isoDateTimeToUnixSeconds('2020-01-01T00:00:00Z');
  const interval: Interval = { unit: 'm', value: 1 };

  const gapPattern: readonly number[] = [0];

  const items = convertRawOhlcDataToInterval(
    TEST_RAW_OHLC_DATA,
    startDate,
    interval,
    gapPattern,
  );

  return { items, interval };
}
