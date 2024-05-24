import { Rect } from '../types';

export interface CanvasRenderer<T> {
  readonly getData: () => T;
  readonly setData: (data: T) => void;
  readonly render: (c: CanvasRenderingContext2D) => void;
}

export type CanvasRenderFn<T> = (
  c: CanvasRenderingContext2D,
  area: Rect | undefined,
  data: T,
) => void;

export function createCanvasRenderer<T>(
  area: Rect | undefined,
  initialData: T,
  renderFn: CanvasRenderFn<T>,
): CanvasRenderer<T> {
  let data: T = initialData;

  const getData = (): T => {
    return data;
  };

  const setData = (newData: T): void => {
    data = newData;
  };

  const render = (c: CanvasRenderingContext2D): void => {
    c.save();
    if (area) {
      c.beginPath();
      c.rect(area.x, area.y, area.width, area.height);
      c.clip();
    }

    renderFn(c, area, data);

    c.restore();
  };

  return {
    getData,
    setData,
    render,
  };
}
