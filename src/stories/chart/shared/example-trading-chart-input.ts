import { TradingChartInputExplicit } from '../../../chart';
import { hexToRgba, rgbaToString } from '../../../util';
import { getExampleData } from './example-data';

export function getExampleTradingChartInput(): TradingChartInputExplicit {
  return {
    size: { width: 800, height: 600 },
    layout: {
      padding: { top: 10, right: 10, bottom: 10, left: 10 },
      xAxisHeight: 20,
      yAxisWidth: 50,
    },
    segments: [
      {
        height: 600 - 10 - 10 - 20,
        range: { from: 0, to: 200 },
      },
    ],
    theme: {
      backgroundColor: '#161A25',
      textColor: 'white',
      gridLineColor: 'rgba(255, 255, 255, 0.08)',
      bullColor: '#089981',
      bearColor: '#F23645',
      volumeBullColor: rgbaToString(hexToRgba('#089981', 0.3)),
      volumeBearColor: rgbaToString(hexToRgba('#F23645', 0.3)),
      textBoxColor: '#3d3d3d',
    },
    data: getExampleData(100),
    dataVisibleSpan: undefined,
    timeframe: {
      unit: 'm',
      value: 1,
    },
    timezone: 'UTC',
    position: {
      rightItemOffset: 60,
      itemSpan: 100,
    },
    cursorPosition: {
      seriesItemIndex: 20,
      segmentIndex: 0,
      value: 254,
    },
  };
}
