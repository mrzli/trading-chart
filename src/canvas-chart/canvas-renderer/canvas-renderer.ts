import { Rect, Size } from '../types';

export interface CanvasRenderer<T> {
  readonly getData: () => T;
  readonly setData: (data: T) => void;
  readonly render: (c: CanvasRenderingContext2D) => void;
}

export function createCanvasRenderer<T>(
  area: Rect | undefined,
  initialData: T,
  doWork: (
    c: CanvasRenderingContext2D,
    canvasSize: Size,
    area: Rect | undefined,
    data: T,
  ) => void,
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
      // c.translate(area.x, area.y);
    }

    const canvasSize: Size = {
      width: c.canvas.width,
      height: c.canvas.height,
    };

    doWork(c, canvasSize, area, data);

    c.restore();
  };

  return {
    getData,
    setData,
    render,
  };
}
