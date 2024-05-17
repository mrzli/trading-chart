import {
  TimeAxisExtendedDataItem,
  TimeAxisInput,
  TimeAxisOutputItem,
} from '../types';

export function getTimeAxisOutputMinute(
  input: TimeAxisInput,
  items: readonly TimeAxisExtendedDataItem[],
): readonly TimeAxisOutputItem[] {
  const result = items.map((v, i) => ({
    offset: v.offset,
    value: v.value,
    dateObject: v.dateObject,
    label: (i % 10).toString(),
  }));

  return result;

  // const { itemSpan } = position;

  // const timePerTick = getTimePerTick(itemSpan, axisLength, interval);

  // const itemWidth = axisLength / itemSpan;
  // const itemTickStride = Math.max(
  //   1,
  //   Math.ceil(MIN_X_AXIS_TICK_DISTANCE / itemWidth),
  // );

  // convert data times, to data objects
  // take first minus 1 to last plus 1 data points
  // check for:
  // - year change (if timePerTick is month or smaller)
  // - month change (if timePerTick is day or smaller)
  // - day change (if timePerTick is hour or smaller)
  // in the order of above, if any occurs, add a tick for those
  //   - keep in mind the distance between the last tick and the next tick is gte to MIN_X_AXIS_TICK_DISTANCE
  //

  // take first data point time
  // calculate first time where:
  // - time is divisible by timePerTick
  // - time is greater than or equal to the first data point time
  // find the index of the first data point with time gte than above
  // until the end of the data points
  // - increment first time by timePerTick
  // - repeat the above
  // - only add the tick if the index of next data point is greater than or equal to the current index + itemTickStride
}