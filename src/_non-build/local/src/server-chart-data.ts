import { isoDateTimeToUnixSeconds } from '@gmjs/date-util';
import { CanvasChartData, Interval, Ohlc } from '../../../chart';
import { parseFloatOrThrow, parseIntegerOrThrow } from '@gmjs/number-util';

export async function getChartData(): Promise<CanvasChartData> {
  const input: GetServerDataInput = { symbol: 'AAPL', interval: '1min' };
  const serverData = await getServerData(input);

  const dataItems: readonly Ohlc[] = serverData.data.map((line) =>
    lineToOhlc(line),
  );
  const dataInterval: Interval = { unit: 'm', value: 1 };

  return { items: dataItems, interval: dataInterval };
}

interface GetServerDataInput {
  readonly symbol: string;
  readonly interval: string;
}

async function getServerData(input: GetServerDataInput): Promise<ResponseData> {
  const { symbol, interval } = input;

  const response = await fetch(
    `http://localhost:3000/api/ticker-data?symbol=${symbol}&interval=${interval}`,
  );
  const data = await response.json();

  return data;
}

interface ResponseData {
  readonly symbol: string;
  readonly interval: string;
  readonly data: readonly string[];
}

function lineToOhlc(line: string): Ohlc {
  const [timestamp, open, high, low, close, volume] = line.split(',');

  const time = isoDateTimeToUnixSeconds(timestamp);

  return {
    time,
    open: parseFloatOrThrow(open),
    high: parseFloatOrThrow(high),
    low: parseFloatOrThrow(low),
    close: parseFloatOrThrow(close),
    volume: parseIntegerOrThrow(volume),
  };
}
