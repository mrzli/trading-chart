import { WICK_THICKNESS } from '../util';

export interface CandleParameters {
  readonly x: number;
  readonly y1: number;
  readonly y2: number;
  readonly y3: number;
  readonly y4: number;
  readonly width: number;
  readonly color: string;
}

export function drawCandle(
  c: CanvasRenderingContext2D,
  parameters: CandleParameters,
): void {
  const {
    x,
    y1,
    y2,
    y3: unadjustedY3,
    y4: unadjustedY4,
    width,
    color,
  } = parameters;

  const wickThickness = WICK_THICKNESS;

  const y3 = unadjustedY3 - y2 < 1 ? unadjustedY3 + 1 : unadjustedY3;
  const y4 = Math.max(unadjustedY4, y3);

  const adjustedCandleWidth = getAdjustedWidth(width, wickThickness);
  const xWick = x - Math.floor(wickThickness / 2);
  const xBar = x - Math.floor(adjustedCandleWidth / 2);

  c.fillStyle = color;

  c.beginPath();
  c.moveTo(xWick, y1);
  c.lineTo(xWick, y2);
  c.lineTo(xBar, y2);
  c.lineTo(xBar, y3);
  c.lineTo(xWick, y3);
  c.lineTo(xWick, y4);
  c.lineTo(xWick + wickThickness, y4);
  c.lineTo(xWick + wickThickness, y3);
  c.lineTo(xBar + adjustedCandleWidth, y3);
  c.lineTo(xBar + adjustedCandleWidth, y2);
  c.lineTo(xWick + wickThickness, y2);
  c.lineTo(xWick + wickThickness, y1);
  c.lineTo(xWick, y1);
  c.fill();
}

function getAdjustedWidth(width: number, wickThickness: number): number {
  const floorWickTickness = Math.floor(wickThickness);
  const isWickThicknessOdd = floorWickTickness % 2 === 1;

  const floorWidth = Math.floor(width);
  const isWidthOdd = floorWidth % 2 === 1;

  return isWickThicknessOdd === isWidthOdd ? width : width + 1;
}
