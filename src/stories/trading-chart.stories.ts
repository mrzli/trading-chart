import type { Meta, StoryObj } from '@storybook/html-vite';
import { drawToCanvas } from '../html-canvas-draw';
import { createExampleCanvas } from './util';
import {
  Ohlc,
  pluginBackground,
  pluginCandleSeries,
  pluginClear,
  pluginXAxis,
  pluginYAxis,
  renderTradingChartExplicit,
  TradingChartInputExplicit,
  TradingChartPlugin,
} from '../chart';
import { DrawItemBatch } from '../types';
import { pluginExample } from '../chart/plugins/example';

interface TradingChartStoryArgs {
  readonly input: TradingChartInputExplicit;
}

const meta = {
  title: 'Chart/Trading Chart',
  tags: ['autodocs'],
  render: (args) => {
    const input = args.input;
    const { width, height } = input.size;

    const { root, canvas } = createExampleCanvas(width, height);

    const plugins: readonly TradingChartPlugin[] = [
      pluginClear({ name: 'clear', priority: 0 }),
      pluginBackground({ name: 'background', priority: 1 }),
      // pluginExample({ name: 'example', priority: 2 }),
      pluginXAxis({ name: 'x-axis', priority: 3 }),
      pluginYAxis({ name: 'y-axis', priority: 3, segmentIndex: 0 }),
      pluginCandleSeries({
        name: 'candle-series',
        priority: 4,
        segmentIndex: 0,
      }),
    ];

    const { batch } = renderTradingChartExplicit(input, plugins);
    const batchObject: DrawItemBatch = { kind: 'batch', items: batch };

    drawToCanvas(canvas, batchObject);

    return root;
  },
  argTypes: {},
  args: {},
} satisfies Meta<TradingChartStoryArgs>;

export default meta;

type Story = StoryObj<TradingChartStoryArgs>;

export const Basic: Story = {
  args: {
    input: {
      size: { width: 800, height: 600 },
      layout: {
        padding: { top: 10, right: 10, bottom: 10, left: 10 },
        heights: [600 - 10 - 10 - 20],
        xAxisHeight: 20,
        yAxisWidth: 50,
      },
      theme: {
        backgroundColor: '#161A25',
        textColor: 'white',
        gridLineColor: 'rgba(255, 255, 255, 0.08)',
        bullColor: '#089981',
        bearColor: '#F23645',
      },
      data: getExampleData(100),
      timeframe: {
        unit: 'm',
        value: 1,
      },
      timezone: 'UTC',
    },
  },
};

function getExampleData(count: number): readonly Ohlc[] {
  const startTime = 1735689600; // 2025-01-01 00:00:00 UTC
  const referentPrice = 100;
  const bodySize = 20;
  const wickSize = 5;
  const priceChange = 5;
  const intervalSize = 5;
  const referentVolume = 1000;
  const volumeChange = 100;

  const data: Ohlc[] = [];

  for (let i = 0; i < count; i++) {
    const time = startTime + i * 60; // 1 minute intervals

    const upInterval = Math.floor(i / intervalSize) % 2 === 0;
    const inIntervalIndex = i % intervalSize;

    if (upInterval) {
      const open = referentPrice + inIntervalIndex * priceChange;
      const close = open + bodySize;
      const high = close + wickSize;
      const low = open - wickSize;
      const volume = referentVolume + i * volumeChange;
      data.push({ time, open, high, low, close, volume });
    } else {
      const open =
        referentPrice +
        bodySize +
        (intervalSize - 1 - inIntervalIndex) * priceChange;
      const close = open - bodySize;
      const high = open + wickSize;
      const low = close - wickSize;
      const volume = referentVolume + i * volumeChange;
      data.push({ time, open, high, low, close, volume });
    }
  }

  return data;
}
