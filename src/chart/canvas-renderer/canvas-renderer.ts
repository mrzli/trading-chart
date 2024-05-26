import { Rect } from '../types';

export interface CanvasRenderer<T> {
  readonly getData: () => T | undefined;
  readonly setData: (data: T | undefined) => void;
  readonly render: (c: CanvasRenderingContext2D) => void;
}

export type CanvasRenderFn<T> = (
  c: CanvasRenderingContext2D,
  area: Rect | undefined,
  data: T,
) => void;

export function createCanvasRenderer<T>(
  area: Rect | undefined,
  initialData: T | undefined,
  renderFn: CanvasRenderFn<T>,
): CanvasRenderer<T> {
  let data: T | undefined = initialData;

  const getData = (): T | undefined => {
    return data;
  };

  const setData = (newData: T | undefined): void => {
    data = newData;
  };

  const render = (c: CanvasRenderingContext2D): void => {
    if (data === undefined) {
      return;
    }

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
