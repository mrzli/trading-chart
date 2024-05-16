// const canvas = document.querySelector('#my-canvas') as HTMLCanvasElement;

import { range } from '@gmjs/array-create';
import {
  HorizontalLineParameters,
  LineGridParameters,
  RectParameters,
  TextParameters,
  VerticalLineParameters,
  drawHorizontalLine,
  drawLineGrid,
  drawRect,
  drawText,
  drawVerticalLine,
} from '../../draw';
import {
  drawCandleSeries,
  CandleSeriesItem,
  CandleSeriesData,
} from '../../draw/series';
import { FinalCanvasChartOptions } from '../setup';
import { Point, Rect } from '../../types';
import { isolatedRender } from '../../helpers';

export function redrawChart(
  c: CanvasRenderingContext2D,
  options: FinalCanvasChartOptions,
  pos: Point | undefined,
): void {
  const { canvasSize, backgroundColor } = options;

  c.lineWidth = 1;

  isolatedRender(c, (c: CanvasRenderingContext2D) => {
    c.clearRect(0, 0, canvasSize.width, canvasSize.height);
    if (backgroundColor !== undefined) {
      c.fillStyle = backgroundColor;
      c.fillRect(0, 0, canvasSize.width, canvasSize.height);
    }
  });

  if (pos !== undefined) {
    // render(c, (c: CanvasRenderingContext2D) => {
    //   const thickness = 20;
    //   const adjustment = getPixelAdjustment(thickness);

    //   const refPos: Point = {
    //     x: pos.x + adjustment,
    //     y: pos.y + adjustment,
    //   };

    //   c.lineWidth = thickness;
    //   c.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    //   c.setLineDash([9, 3, 1, 1]);

    //   c.beginPath();
    //   c.moveTo(refPos.x, refPos.y + 100);
    //   c.lineTo(refPos.x, refPos.y);
    //   c.lineTo(refPos.x + 100, refPos.y);
    //   c.stroke();
    // });

    // render(c, (c: CanvasRenderingContext2D) => {
    //   c.font = '10px sans-serif';
    //   c.textAlign = 'center';
    //   c.textBaseline = 'middle';
    //   c.fillText('Hello World', 100, 50);
    //   c.fillText('Hello World', pos.x, pos.y);
    // });

    isolatedRender(c, (c: CanvasRenderingContext2D) => {
      const hParams: HorizontalLineParameters = {
        y: pos.y,
        x1: 20,
        x2: canvasSize.width - 20,
        color: 'rgba(0, 0, 0, 0.1)',
        thickness: 1,
      };
      drawHorizontalLine(c, hParams);

      const vParams: VerticalLineParameters = {
        x: pos.x,
        y1: 20,
        y2: canvasSize.height - 20,
        color: 'rgba(0, 0, 0, 0.1)',
        thickness: 1,
      };
      drawVerticalLine(c, vParams);

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

      const lineGridParameters: LineGridParameters = {
        xArray: [pos.x - 50, pos.x + 50],
        yArray: [pos.y - 50, pos.y + 50],
        x1: 20,
        x2: canvasSize.width - 20,
        y1: 20,
        y2: canvasSize.height - 20,
        color: 'rgba(255, 0, 0, 1)',
        thickness: 1,
      };
      drawLineGrid(c, lineGridParameters);

      const rectParameters: RectParameters = {
        x: pos.x + 150,
        y: pos.y + 150,
        width: 200,
        height: 1,
        drawType: 'fill',
        fillColor: 'orange',
      };
      drawRect(c, rectParameters);

      const textParameters: TextParameters = {
        x: 100,
        y: 100,
        text: 'Hello World',
        font: 'bold 12px sans-serif',
      };
      drawText(c, textParameters);

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

      const data: CandleSeriesData = {
        itemWidth: 20,
        items: getExampleCandleSeriesData(),
      };

      drawCandleSeries(c, area, data);
    });
  }

  // render(c, (c) => {
  //   c.beginPath();
  //   c.moveTo(20, 220);
  //   c.lineTo(220, 220);
  //   c.stroke();
  // });
}

function getExampleCandleSeriesData(): readonly CandleSeriesItem[] {
  return range(0, 100).map((i) => {
    const offset = i * 5;

    return {
      time: i,
      x: 50 + i * 20,
      y1: 10 + offset,
      y2: 20 + offset,
      y3: 40 + offset,
      y4: 55 + offset,
      color: i % 2 === 0 ? '#F23645' : '#089981',
    };
  });
}
