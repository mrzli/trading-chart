import { applyFn } from '@gmjs/apply-function';
import { groupBy, map, toArray } from '@gmjs/value-transformers';
import { DrawItem, DrawItemBatch, DrawItemPath, Rect } from '../../types';
import { rectToClipPath } from '../../util';

export interface BarSeriesRenderItem {
  readonly xItem: number;
  readonly y1: number;
  readonly y2: number;
  readonly color: string;
}

export interface RenderBarSeriesInput {
  readonly area: Rect;
  readonly itemWidth: number;
  readonly items: readonly BarSeriesRenderItem[];
}

export function renderBarSeries(
  input: RenderBarSeriesInput,
): readonly DrawItem[] {
  const { area, itemWidth, items } = input;

  const barWidth = Math.max(
    Math.floor(itemWidth * BAR_WIDTH_FRACTION),
    MIN_BAR_WIDTH,
  );
  const barXOffset = Math.floor((itemWidth - barWidth) / 2);

  const batchItems: readonly DrawItemBatch[] = applyFn(
    items,
    groupBy((item) => item.color),
    map(([color, items]) =>
      getBarDrawBatch(color, items, area, barXOffset, barWidth),
    ),
    toArray(),
  );

  const batch: DrawItemBatch = {
    kind: 'batch',
    clipPath: rectToClipPath(area),
    items: batchItems,
  };

  return [batch];
}

const BAR_WIDTH_FRACTION = 0.7;
const MIN_BAR_WIDTH = 1;

function getBarDrawBatch(
  color: string,
  items: readonly BarSeriesRenderItem[],
  area: Rect,
  barXOffset: number,
  barWidth: number,
): DrawItemBatch {
  const path: DrawItemPath = {
    kind: 'path',
    operation: 'fill',
    commands: items.map((item) => ({
      kind: 'rect',
      x: area.x + item.xItem + barXOffset,
      y: area.y + item.y1,
      width: barWidth,
      height: item.y2 - item.y1,
    })),
  };

  return {
    kind: 'batch',
    clipPath: undefined,
    style: {
      fillStrokeStyle: {
        fillStyle: color,
      },
    },
    items: [path],
  };
}
