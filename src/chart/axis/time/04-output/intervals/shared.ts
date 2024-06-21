import { applyFn } from '@gmjs/apply-function';
import { binarySearchIndexLte } from '@gmjs/binary-search';
import { map, filterOutNullish } from '@gmjs/value-transformers';
import { TimeDisplayType } from '../types';

export function getTakenTicks(
  existingTicks: readonly TimeDisplayType[],
): number[] {
  const takenTicks = applyFn(
    existingTicks,
    map((v, i) => (v === 'none' ? undefined : i)),
    filterOutNullish(),
  );

  return [...takenTicks];
}

export function addTakenTick(takenTicks: number[], tick: number): void {
  const prevIndex = binarySearchIndexLte(tick, takenTicks);
  takenTicks.splice(prevIndex + 1, 0, tick);
}

export function canAddTick(
  takenTicks: number[],
  tick: number,
  minTickItemDistance: number,
): boolean {
  const prevIndex = binarySearchIndexLte(tick, takenTicks);
  const nextIndex = prevIndex + 1;
  const prevTick = prevIndex >= 0 ? takenTicks[prevIndex] : undefined;
  const nextTick =
    nextIndex < takenTicks.length ? takenTicks[nextIndex] : undefined;

  const canAddDueToPrev =
    prevTick === undefined || tick - minTickItemDistance >= prevTick;
  const canAddDueToNext =
    nextTick === undefined || tick + minTickItemDistance <= nextTick;

  return canAddDueToPrev && canAddDueToNext;
}
