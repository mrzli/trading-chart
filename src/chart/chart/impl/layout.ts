import { TextParametersStyle } from '../../draw';
import {
  ChartAreas,
  getChartAreas,
  getNumIntegerDigits,
  measureText,
} from '../../helpers';
import { Range, Size } from '../../types';

const SIZE_BUFFER = 10;

export function getChartLayout(
  canvas: HTMLCanvasElement,
  size: Size,
  fontSize: number,
  priceRange: Range,
  pricePrecision: number,
): ChartAreas {
  const textForMeasurementFrom = getTextForMeasurement(
    priceRange.from,
    pricePrecision,
  );

  const textForMeasurementTo = getTextForMeasurement(
    priceRange.to,
    pricePrecision,
  );

  const c = canvas.getContext('2d')!;

  const textStyle: TextParametersStyle = {
    fontSize,
    fontFamily: 'sans-serif',
  };
  const textSizeFrom = measureText(c, textStyle, textForMeasurementFrom);
  const textSizeTo = measureText(c, textStyle, textForMeasurementTo);

  const xAxisHeight = textSizeFrom.height + SIZE_BUFFER;
  const yAxisWidth =
    Math.max(textSizeFrom.width, textSizeTo.width) + SIZE_BUFFER;

  const chartAreas = getChartAreas(size, xAxisHeight, yAxisWidth);

  return chartAreas;
}

function getTextForMeasurement(price: number, pricePrecision: number): string {
  const numIntegerDigits = getNumIntegerDigits(price);

  return (
    (price < 0 ? '-' : '') +
    '0'.repeat(numIntegerDigits) +
    (pricePrecision > 0 ? '.' + '0'.repeat(pricePrecision) : '')
  );
}
