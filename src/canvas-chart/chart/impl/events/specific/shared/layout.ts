import { ChartAreas, isPointInRect } from '../../../../../helpers';
import { Point, Rect } from '../../../../../types';
import { EventArea } from '../types';

export function getEventArea(pos: Point, areas: ChartAreas): EventArea {
  const areaMapping = toAreaMapping(areas);
  for (const [area, eventArea] of areaMapping) {
    if (isPointInRect(pos, area)) {
      return eventArea;
    }
  }

  return 'none';
}

function toAreaMapping(
  areas: ChartAreas,
): readonly (readonly [Rect, EventArea])[] {
  return [
    [areas.main, 'main'],
    [areas.xAxis, 'x-axis'],
    [areas.yAxis, 'y-axis'],
    [areas.corner, 'corner'],
  ];
}
