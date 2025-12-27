import {
  DrawItem,
  DrawItemBatch,
  DrawItemPath,
  DrawPathCommand,
  DrawPathCommandLineTo,
  DrawPathCommandMoveTo,
  FillStrokeStyle,
  PathStyle,
  Rect,
} from '../../types';
import {
  DEFAULT_THICKNESS,
  getPixelAdjustment,
  rectToClipPath,
} from '../../util';

export interface VerticalLineBatch {
  readonly color?: string;
  readonly pathStyle?: PathStyle;
  readonly offsets: readonly number[];
}

export interface RenderVerticalLinesInput {
  readonly area: Rect;
  readonly batches: readonly VerticalLineBatch[];
}

export function renderVerticalLines(
  input: RenderVerticalLinesInput,
): readonly DrawItem[] {
  const { area, batches } = input;

  const drawBatches = batches.map((b) => getDrawBatch(area, b));

  const batch: DrawItemBatch = {
    kind: 'batch',
    clipPath: rectToClipPath(area),
    items: drawBatches,
  };

  return [batch];
}

function getDrawBatch(area: Rect, batch: VerticalLineBatch): DrawItemBatch {
  const { color, pathStyle, offsets } = batch;

  const fillStrokeStyle: FillStrokeStyle | undefined =
    color !== undefined
      ? {
          strokeStyle: color,
        }
      : undefined;

  const thickness = pathStyle?.lineWidth ?? DEFAULT_THICKNESS;

  const item: DrawItemPath = {
    kind: 'path',
    fillStrokeType: 'stroke',
    commands: getPathCommands(area, offsets, thickness),
  };

  return {
    kind: 'batch',
    style: {
      fillStrokeStyle,
      pathStyle,
    },
    items: [item],
  };
}

function getPathCommands(
  area: Rect,
  offsets: readonly number[],
  thickness: number,
): readonly DrawPathCommand[] {
  const adjustment = getPixelAdjustment(thickness);

  const commands: DrawPathCommand[] = [];

  for (const offset of offsets) {
    const x = area.x + offset + adjustment;

    const moveToCommand: DrawPathCommandMoveTo = {
      kind: 'move-to',
      x,
      y: area.y,
    };
    commands.push(moveToCommand);

    const lineToCommand: DrawPathCommandLineTo = {
      kind: 'line-to',
      x,
      y: area.y + area.height,
    };
    commands.push(lineToCommand);
  }

  return commands;
}
