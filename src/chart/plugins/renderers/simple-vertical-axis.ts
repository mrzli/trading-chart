import {
  DrawItem,
  DrawItemBatch,
  DrawItemPath,
  DrawItemText,
  DrawPathCommand,
  FontStyle,
  Rect,
} from '../../../types';
import {
  DEFAULT_THICKNESS,
  getPixelAdjustment,
  rectToClipPath,
} from '../../../util';

export interface SimpleVerticalAxisTickItem {
  readonly offset: number;
  readonly label: string;
}

export interface RenderSimpleVerticalAxisInput {
  readonly area: Rect;
  readonly fontStyle?: FontStyle;
  readonly color?: string;
  readonly xOffset?: number;
  readonly ticks: readonly SimpleVerticalAxisTickItem[];
}

export function renderSimpleVerticalAxis(
  input: RenderSimpleVerticalAxisInput,
): readonly DrawItem[] {
  const { area, color, fontStyle, xOffset, ticks } = input;

  const finalXOffset = xOffset ?? 0;

  const labelItemsBatch = getLabelItemsBatch(
    area,
    color,
    fontStyle,
    ticks,
    finalXOffset,
  );

  const tickLength = finalXOffset - TICK_LINE_TO_LABEL_DISTANCE;
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
  ticks: readonly SimpleVerticalAxisTickItem[],
  xOffset: number,
): DrawItemBatch {
  const x = area.x + xOffset;

  const labelItems: readonly DrawItemText[] = ticks.map((tick) => ({
    kind: 'text',
    x,
    y: area.y + tick.offset,
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
        horizontalAlign: 'left',
        verticalAlign: 'middle',
      },
    },
    items: labelItems,
  };
}

function getTicksBatch(
  area: Rect,
  color: string | undefined,
  ticks: readonly SimpleVerticalAxisTickItem[],
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
  ticks: readonly SimpleVerticalAxisTickItem[],
  tickLength: number,
  thickness: number,
): readonly DrawPathCommand[] {
  const adjustment = getPixelAdjustment(thickness);

  return ticks.flatMap((tick) => {
    const y = area.y + tick.offset + adjustment;

    const singleTickCommands: readonly DrawPathCommand[] = [
      {
        kind: 'move-to',
        x: area.x,
        y,
      },
      {
        kind: 'line-to',
        x: area.x + tickLength,
        y,
      },
    ];

    return singleTickCommands;
  });
}

const TICK_LINE_TO_LABEL_DISTANCE = 3;
