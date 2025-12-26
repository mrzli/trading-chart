import { DrawItem, DrawPathCommand, Size } from '../../../types';

export interface RenderBackgroundInput {
  readonly size: Size;
  readonly color: string;
}

export function renderBackground(
  input: RenderBackgroundInput,
): readonly DrawItem[] {
  const { size, color } = input;
  const { width, height } = size;

  const rectCommand: DrawPathCommand = {
    kind: 'rect',
    x: 0,
    y: 0,
    width,
    height,
  };

  const batch: readonly DrawItem[] = [
    {
      kind: 'batch',
      clipPath: [rectCommand],
      style: {
        fillStrokeStyle: { fillStyle: color },
      },
      items: [
        {
          kind: 'path',
          fillStrokeType: 'fill',
          commands: [rectCommand],
        },
      ],
    },
  ];

  return batch;
}
