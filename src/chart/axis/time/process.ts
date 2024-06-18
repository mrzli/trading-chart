import { TimeAxisInput, TimeAxisOutputItem } from './types';
import { getTimeAxisTickValues } from './01-tick-values';
import { getTimeAxisExtendedItems } from './02-extended-items';
import { getMinTimeTickInterval } from './03-time-tick-interval';
import { getTimeAxisOutput } from './output';

export function processTimeAxisData(
  input: TimeAxisInput,
): readonly TimeAxisOutputItem[] {
  const { timezone } = input;

  // get pixel offsets for timestamps
  const tickValues = getTimeAxisTickValues(input);
  if (tickValues.length === 0) {
    return [];
  }

  // get additional date data, for easier further processing
  const extendedItems = getTimeAxisExtendedItems(tickValues, timezone);

  // get minimal distance between ticks, in terms of time
  const timeTickInterval = getMinTimeTickInterval(input);

  const result = getTimeAxisOutput(input, extendedItems, timeTickInterval);

  return result;
}

// handling time tick interval
// - Y
//   - can be 1, 2, 4, 5, 10, 20, etc
//   - just find first divisible, start with that
//     - then add the number
//     - if it matches the sum, add the item
//     - repeat till end
//   - go over items again and fill any gaps with any year encountered
// - M 6
//   - as for Y, but when going over items, try each year (start index)
//   - try each July
// - M 3
//   - as for Y
//   - try each July
//   - try each April and October
// - M 1
//   - as for Y
//   - try each July
//   - try each April and October
//   - try each other month
// - D 14
//   - as for M 1
//   - try first available day gte 15th
// - D 7
//   - as for M 1
//   - try first available day gte 15th
//   - try first available day gte 8th and gte 22nd
// - D 3
//   - as for M 1
//   - try first gte 4th, 7th etc.
// - D 2
//   - as for M 1
//   - try first gte 3rd, 5th etc.
// - D 1
//   - as for M 1
//   - try each day
// - H 12
//   - as for D 1
//   - try first minute gte 12:00
// - H 8
//   - as for D 1
//   - try first minute gte 08:00, 16:00
// - H 6
//   - as for D 1
//   - try first minute gte 12:00
//   - try first minute gte 06:00, 18:00
// - H 4
//   - as for D 1
//   - try first minute gte 08:00, 16:00
//   - try first minute gte 04:00, 12:00, 20:00
// - H 3
//   - as for D 1
//   - try first minute gte 12:00
//   - try first minute gte 06:00, 18:00
//   - try first minute gte 03:00, 09:00, 15:00, 21:00
// - H 2
//   - as for D 1
//   - try first minute gte 08:00, 16:00
//   - try first minute gte 04:00, 12:00, 20:00
//   - try first minute gte 02:00, 06:00, 10:00, 14:00, 18:00, 22:00
// - H 1
//   - as for D 1
//   - try first minute gte 08:00, 16:00
//   - try first minute gte 04:00, 12:00, 20:00
//   - try first minute gte 02:00, 06:00, 10:00, 14:00, 18:00, 22:00
//   - try first minute each hour
// - M 30
//   - as for H 1
//   - try first minute gte 30
// - M 15
//   - as for H 1
//   - try first minute gte 30
//   - try first minute gte 15, 45
// - M 10
//   - as for H 1
//   - try first minute gte 30
//   - try other divisible by 10
// - M 5
//   - as for H 1
//   - try first minute gte 30
//   - try first minute gte 15, 45
//   - try other divisible by 5
// - M 3
//   - as for H 1
//   - try first minute gte 30
//   - try first minute gte 15, 45
//   - try other divisible by 3
// - M 2
//   - as for H 1
//   - try first minute gte 30
//   - try other divisible by 10
//   - try other divisible by 2
// - M 1
//   - as for H 1
//   - try first minute gte 30
//   - try other divisible by 10
//   - try other divisible by 5
//   - try other minutes
