import { Range } from '../../../types';

export function changeNumericSpan(range: Range, span: number): Range {
  const midPrice = (range.from + range.to) / 2;
  return {
    from: midPrice - span / 2,
    to: midPrice + span / 2,
  };
}

export function multiplyNumericSpan(
  range: Range,
  multiplier: number,
): Range {
  const oldSpan = range.to - range.from;
  const newSpan = oldSpan * multiplier;
  return changeNumericSpan(range, newSpan);
}
