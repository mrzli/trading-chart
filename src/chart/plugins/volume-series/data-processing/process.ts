import { applyFn } from '@gmjs/apply-function';
import { maxBy } from '@gmjs/value-transformers';
import { Ohlc } from '../../../types';
import { getFirstVisibleIndex, getLastVisibleIndex } from '../../../util';
import {
  VolumeSeriesInput,
  VolumeSeriesOutput,
  VolumeSeriesOutputItem,
} from './types';

export function processVolumeSeries(
  input: VolumeSeriesInput,
): VolumeSeriesOutput {
  const { data, dataVisibleSpan, position, xAxisLength, height } = input;

  const { rightItemOffset, itemSpan } = position;

  const leftItemOffset = rightItemOffset - itemSpan;
  const itemWidth = xAxisLength / itemSpan;

  const nonConstrainedFirstIndex = getFirstVisibleIndex(position, data.length);
  const firstIndex = Math.max(
    nonConstrainedFirstIndex,
    dataVisibleSpan?.from ?? nonConstrainedFirstIndex,
  );
  const nonConstrainedLastIndex = getLastVisibleIndex(position, data.length);
  const lastIndex = Math.min(
    nonConstrainedLastIndex,
    dataVisibleSpan?.to ?? nonConstrainedLastIndex,
  );

  const maxVolume = applyFn(
    data,
    (data) => data.slice(firstIndex, lastIndex + 1),
    maxBy((item) => item.volume),
  );

  const items: VolumeSeriesOutputItem[] = [];

  const firstXOffset = (firstIndex - leftItemOffset) * itemWidth;

  for (let i = firstIndex; i <= lastIndex; i++) {
    const item = data[i];
    const volumeItem = toVolumeSeriesItem(
      item,
      maxVolume,
      firstXOffset,
      i - firstIndex,
      itemWidth,
      height,
    );
    items.push(volumeItem);
  }

  return {
    itemWidth,
    items,
  };
}

function toVolumeSeriesItem(
  ohlc: Ohlc,
  maxVolume: number,
  xOffset: number,
  xIndex: number,
  itemWidth: number,
  height: number,
): VolumeSeriesOutputItem {
  const { open, close, volume } = ohlc;

  const isBull = close > open;
  const barHeight = Math.round((volume / maxVolume) * height);

  const xItem = Math.round(xOffset + xIndex * itemWidth);

  return {
    x: xItem,
    y1: height - barHeight,
    y2: height,
    type: isBull ? 'bull' : 'bear',
  };
}
