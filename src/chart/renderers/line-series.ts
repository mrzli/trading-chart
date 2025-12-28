import {
  DrawItem,
  DrawItemBatch,
  DrawItemPath,
  DrawPathCommand,
  Rect,
} from '../../types';
import { rectToClipPath } from '../../util';

export interface LineSeriesRenderItem {
  readonly x: number;
  readonly y: number;
}

export interface RenderLineSeriesInput {
  readonly area: Rect;
  readonly color: string;
  readonly items: readonly LineSeriesRenderItem[];
}

export function renderLineSeries(
  input: RenderLineSeriesInput,
): readonly DrawItem[] {
  const { area, color, items } = input;

  const pathItem: DrawItemPath = {
    kind: 'path',
    operation: 'stroke',
    commands: getPathCommands(items),
  };

  const batch: DrawItemBatch = {
    kind: 'batch',
    clipPath: rectToClipPath(area),
    style: {
      fillStrokeStyle: {
        strokeStyle: color,
      },
    },
    items: [pathItem],
  };

  return [batch];
}

function getPathCommands(
  items: readonly LineSeriesRenderItem[],
): readonly DrawPathCommand[] {
  if (items.length <= 1) {
    return [];
  }

  const commands: DrawPathCommand[] = [
    {
      kind: 'move-to',
      x: items[0].x,
      y: items[0].y,
    },
  ];

  for (let i = 1; i < items.length; i++) {
    const current = items[i];

    const command: DrawPathCommand = {
      kind: 'line-to',
      x: current.x,
      y: current.y,
    };

    commands.push(command);
  }

  return commands;
}
