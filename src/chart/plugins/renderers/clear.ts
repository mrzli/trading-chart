import { DrawItem, Size } from '../../../types';

export interface RenderClearInput {
  readonly size: Size;
}

export function renderClear(input: RenderClearInput): readonly DrawItem[] {
  const { size } = input;
  const { width, height } = size;

  const batch: readonly DrawItem[] = [
    {
      kind: 'clear',
      area: {
        x: 0,
        y: 0,
        width,
        height,
      },
    },
  ];

  return batch;
}
