import {
  CandleSeriesData,
  CandleSeriesItem,
  drawCandleSeries,
} from '../../draw/series';
import { Rect, Size } from '../../types';
import {
  CanvasRenderer,
  createCanvasRenderer,
} from '../../canvas-renderer/canvas-renderer';

function createCanvasRenderer1(): CanvasRenderer<readonly CandleSeriesItem[]> {
  const render = (
    c: CanvasRenderingContext2D,
    canvasSize: Size,
    _area: Rect | undefined,
    data: readonly CandleSeriesItem[],
  ): void => {
    // const pos: Point = {
    //   x: 400,
    //   y: 200,
    // };

    // const hParams: HorizontalLineParameters = {
    //   y: pos.y,
    //   x1: 20,
    //   x2: canvasSize.width - 20,
    //   color: 'rgba(0, 0, 0, 0.1)',
    //   thickness: 1,
    // };
    // drawHorizontalLine(c, hParams);

    // const vParams: VerticalLineParameters = {
    //   x: pos.x,
    //   y1: 20,
    //   y2: canvasSize.height - 20,
    //   color: 'rgba(0, 0, 0, 0.1)',
    //   thickness: 1,
    // };
    // drawVerticalLine(c, vParams);

    // const hsParams: HorizontalLinesParameters = {
    //   yArray: [pos.y - 50, pos.y + 50],
    //   x1: 20,
    //   x2: canvasSize.width - 20,
    //   color: 'rgba(255, 0, 0, 1)',
    //   thickness: 1,
    // };
    // drawHorizontalLines(c, hsParams);

    // const vsParams: VerticalLinesParameters = {
    //   xArray: [pos.x - 50, pos.x + 50],
    //   y1: 20,
    //   y2: canvasSize.height - 20,
    //   color: 'rgba(0, 0, 255, 1)',
    //   thickness: 1,
    // };
    // drawVerticalLines(c, vsParams);

    // const lineGridParameters: LineGridParameters = {
    //   xArray: [pos.x - 50, pos.x + 50],
    //   yArray: [pos.y - 50, pos.y + 50],
    //   x1: 20,
    //   x2: canvasSize.width - 20,
    //   y1: 20,
    //   y2: canvasSize.height - 20,
    //   color: 'rgba(255, 0, 0, 1)',
    //   thickness: 1,
    // };
    // drawLineGrid(c, lineGridParameters);

    // const rectParameters: RectParameters = {
    //   x: pos.x + 150,
    //   y: pos.y + 150,
    //   width: 200,
    //   height: 1,
    //   drawType: 'fill',
    //   fillColor: 'orange',
    // };
    // drawRect(c, rectParameters);

    // const textParameters: TextParameters = {
    //   x: 100,
    //   y: 100,
    //   text: 'Hello World',
    //   font: 'bold 12px sans-serif',
    // };
    // drawText(c, textParameters);

    // const repeats = 100_000;

    // console.time('drawCandle');
    // for (let i = 0; i < repeats; i++) {
    //   const candleParameters: CandleParameters = {
    //     x: 900 + i * 10,
    //     y1: 400,
    //     y2: 450,
    //     y3: 600,
    //     y4: 700,
    //     width: 6,
    //     color: i % 2 === 0 ? 'red' : 'green',
    //   };
    //   drawCandle(c, candleParameters);
    // }
    // console.timeEnd('drawCandle');

    const area: Rect = {
      x: 100,
      y: 100,
      width: 800,
      height: 600,
    };

    const finalData: CandleSeriesData = {
      itemWidth: 20,
      items: data,
    };

    drawCandleSeries(c, area, finalData);
  };

  return createCanvasRenderer<readonly CandleSeriesItem[]>(
    undefined,
    [],
    render,
  );
}
