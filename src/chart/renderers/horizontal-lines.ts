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

export interface HorizontalLineBatch {
  readonly color?: string;
  readonly pathStyle?: PathStyle;
  readonly offsets: readonly number[];
}

export interface RenderHorizontalLinesInput {
  readonly area: Rect;
  readonly batches: readonly HorizontalLineBatch[];
}

export function renderHorizontalLines(
  input: RenderHorizontalLinesInput,
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

function getDrawBatch(area: Rect, batch: HorizontalLineBatch): DrawItemBatch {
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
    const y = area.y + offset + adjustment;

    const moveToCommand: DrawPathCommandMoveTo = {
      kind: 'move-to',
      x: area.x,
      y,
    };
    commands.push(moveToCommand);

    const lineToCommand: DrawPathCommandLineTo = {
      kind: 'line-to',
      x: area.x + area.width,
      y,
    };
    commands.push(lineToCommand);
  }

  return commands;
}
