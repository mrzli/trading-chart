import { randomInteger } from '@gmjs/number-util';
import { CanvasChartData } from '../../chart';
import { getChartData } from '../local/src/built-in-chart-data';

export async function manipulateData(): Promise<void> {
  const data = await getChartData();
  setVolume(data);
}

function setVolume(data: CanvasChartData): void {
  const updatedData = data.items.map((item) => {
    const { time: _ignore1, ...rest } = item;

    return {
      ...rest,
      volume: randomInteger(5, 10_000),
    };
  });
  console.log(updatedData);
}
