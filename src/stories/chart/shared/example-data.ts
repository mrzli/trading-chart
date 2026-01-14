import { Ohlc } from '../../../chart';

export function getExampleData(count: number): readonly Ohlc[] {
  const startTime = 1735689600; // 2025-01-01 00:00:00 UTC
  const referentPrice = 100;
  const bodySize = 20;
  const wickSize = 5;
  const priceChange = 5;
  const intervalSize = 5;
  const referentVolume = 1000;
  const volumeChange = 100;

  const data: Ohlc[] = [];

  for (let i = 0; i < count; i++) {
    const time = startTime + i * 60; // 1 minute intervals

    const upInterval = Math.floor(i / intervalSize) % 2 === 0;
    const inIntervalIndex = i % intervalSize;

    if (upInterval) {
      const open = referentPrice + inIntervalIndex * priceChange;
      const close = open + bodySize;
      const high = close + wickSize;
      const low = open - wickSize;
      const volume = referentVolume + i * volumeChange;
      data.push({ time, open, high, low, close, volume });
    } else {
      const open =
        referentPrice +
        bodySize +
        (intervalSize - 1 - inIntervalIndex) * priceChange;
      const close = open - bodySize;
      const high = open + wickSize;
      const low = close - wickSize;
      const volume = referentVolume + i * volumeChange;
      data.push({ time, open, high, low, close, volume });
    }
  }

  return data;
}
