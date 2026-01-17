import { TradingChartInputExplicit } from '../../../chart';
import { Margin } from '../../../types';
import { hexToRgba, rgbaToString } from '../../../util';
import { getExampleData } from './example-data';

export function getExampleTradingChartInput(): TradingChartInputExplicit {
  const padding: Margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const xAxisHeight = 20;

  return {
    size: { width: 800, height: 600 },
    layout: {
      padding,
      xAxisHeight,
      yAxisWidth: 50,
    },
    segments: [
      {
        height: 600 - padding.top - padding.bottom - xAxisHeight,
        range: { from: 0, to: 200 },
      },
    ],
    theme: {
      backgroundColor: '#161A25',
      textColor: 'white',
      gridLineColor: 'rgba(255, 255, 255, 0.08)',
      cursorLineColor: 'rgba(255, 255, 255, 0.5)',
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
