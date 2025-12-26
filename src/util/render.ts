import { DrawPathCommand, Rect } from '../types';

export function getPixelAdjustment(thickness: number): number {
  return (Math.floor(thickness) % 2) / 2;
}

export function rectToClipPath(
  rect: Rect | undefined,
): readonly DrawPathCommand[] | undefined {
  if (rect === undefined) {
    return undefined;
  }

  const rectCommand: DrawPathCommand = {
    kind: 'rect',
    ...rect,
  };

  return [rectCommand];
}
