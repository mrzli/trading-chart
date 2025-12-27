import {
  DrawItem,
  DrawItemBatch,
  DrawItemPath,
  DrawItemText,
  DrawPathCommand,
  FontStyle,
  Rect,
} from '../../types';
import {
  DEFAULT_THICKNESS,
  getPixelAdjustment,
  rectToClipPath,
} from '../../util';

export interface SimpleHorizontalAxisTickItem {
  readonly offset: number;
  readonly label: string;
}

export interface RenderSimpleHorizontalAxisInput {
  readonly area: Rect;
  readonly fontStyle?: FontStyle;
  readonly color?: string;
  readonly yOffset?: number;
  readonly ticks: readonly SimpleHorizontalAxisTickItem[];
}

export function renderSimpleHorizontalAxis(
  input: RenderSimpleHorizontalAxisInput,
): readonly DrawItem[] {
  const { area, color, fontStyle, yOffset, ticks } = input;

  const finalYOffset = yOffset ?? 0;

  const labelItemsBatch = getLabelItemsBatch(
    area,
    color,
    fontStyle,
    ticks,
    finalYOffset,
  );

  const tickLength = finalYOffset - TICK_LINE_TO_LABEL_DISTANCE;
  const thickness = DEFAULT_THICKNESS;

  const ticksBatch =
    tickLength > 0
      ? getTicksBatch(area, color, ticks, tickLength, thickness)
      : undefined;

  const allDrawItems: readonly DrawItem[] =
    ticksBatch !== undefined
      ? [labelItemsBatch, ticksBatch]
      : [labelItemsBatch];

  const batch: DrawItemBatch = {
    kind: 'batch',
    clipPath: rectToClipPath(area),
    items: allDrawItems,
  };

  return [batch];
}

function getLabelItemsBatch(
  area: Rect,
  color: string | undefined,
  fontStyle: FontStyle | undefined,
  ticks: readonly SimpleHorizontalAxisTickItem[],
  yOffset: number,
): DrawItemBatch {
  const y = area.y + yOffset;

  const labelItems: readonly DrawItemText[] = ticks.map((tick) => ({
    kind: 'text',
    x: area.x + tick.offset,
    y,
    text: tick.label,
  }));

  return {
    kind: 'batch',
    style: {
      fillStrokeStyle: {
        fillStyle: color,
      },
      textStyle: {
        font: fontStyle,
        horizontalAlign: 'center',
        verticalAlign: 'top',
      },
    },
    items: labelItems,
  };
}

function getTicksBatch(
  area: Rect,
  color: string | undefined,
  ticks: readonly SimpleHorizontalAxisTickItem[],
  tickLength: number,
  thickness: number,
): DrawItemBatch {
  const commands = getTicksCommands(area, ticks, tickLength, thickness);

  const ticksItem: DrawItemPath = {
    kind: 'path',
    fillStrokeType: 'stroke',
    commands,
  };

  return {
    kind: 'batch',
    style: {
      fillStrokeStyle: {
        strokeStyle: color,
      },
    },
    items: [ticksItem],
  };
}

function getTicksCommands(
  area: Rect,
  ticks: readonly SimpleHorizontalAxisTickItem[],
  tickLength: number,
  thickness: number,
): readonly DrawPathCommand[] {
  const adjustment = getPixelAdjustment(thickness);

  return ticks.flatMap((tick) => {
    const x = area.x + tick.offset + adjustment;

    const singleTickCommands: readonly DrawPathCommand[] = [
      {
        kind: 'move-to',
        x,
        y: area.y,
      },
      {
        kind: 'line-to',
        x,
        y: area.y + tickLength,
      },
    ];

    return singleTickCommands;
  });
}

const TICK_LINE_TO_LABEL_DISTANCE = 3;
