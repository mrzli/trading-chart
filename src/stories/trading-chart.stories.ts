import type { Meta, StoryObj } from '@storybook/html-vite';
import { drawToCanvas } from '../html-canvas-draw';
import { createExampleCanvas } from './util';
import {
  pluginBackground,
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
        heights: [500],
        xAxisHeight: 20,
        yAxisWidth: 50,
      },
      theme: {
        backgroundColor: '#161A25',
        textColor: 'white',
        gridLineColor: 'rgba(255, 255, 255, 0.08)',
      },
      data: [
        {
          time: 1735689600,
          open: 100,
          high: 105,
          low: 95,
          close: 102,
          volume: 1500,
        },
        {
          time: 1735689660,
          open: 102,
          high: 106,
          low: 101,
          close: 104,
          volume: 1200,
        },
        {
          time: 1735689720,
          open: 104,
          high: 108,
          low: 103,
          close: 107,
          volume: 1300,
        },
        {
          time: 1735689780,
          open: 107,
          high: 109,
          low: 105,
          close: 106,
          volume: 1100,
        },
        {
          time: 1735689840,
          open: 106,
          high: 107,
          low: 102,
          close: 103,
          volume: 1400,
        },
        {
          time: 1735689900,
          open: 103,
          high: 104,
          low: 100,
          close: 101,
          volume: 1600,
        },
        {
          time: 1735689960,
          open: 101,
          high: 103,
          low: 99,
          close: 100,
          volume: 1700,
        },
        {
          time: 1735690020,
          open: 100,
          high: 102,
          low: 98,
          close: 99,
          volume: 1800,
        },
        {
          time: 1735690080,
          open: 99,
          high: 101,
          low: 97,
          close: 98,
          volume: 1900,
        },
        {
          time: 1735690140,
          open: 98,
          high: 100,
          low: 96,
          close: 97,
          volume: 2000,
        },
        {
          time: 1735690200,
          open: 97,
          high: 99,
          low: 95,
          close: 96,
          volume: 2100,
        },
        {
          time: 1735690260,
          open: 96,
          high: 98,
          low: 94,
          close: 95,
          volume: 2200,
        },
        {
          time: 1735690320,
          open: 95,
          high: 97,
          low: 93,
          close: 94,
          volume: 2300,
        },
        {
          time: 1735690380,
          open: 94,
          high: 96,
          low: 92,
          close: 93,
          volume: 2400,
        },
        {
          time: 1735690440,
          open: 93,
          high: 95,
          low: 91,
          close: 92,
          volume: 2500,
        },
        {
          time: 1735690500,
          open: 92,
          high: 94,
          low: 90,
          close: 91,
          volume: 2600,
        },
        {
          time: 1735690560,
          open: 91,
          high: 93,
          low: 89,
          close: 90,
          volume: 2700,
        },
        {
          time: 1735690620,
          open: 90,
          high: 92,
          low: 88,
          close: 89,
          volume: 2800,
        },
        {
          time: 1735690680,
          open: 89,
          high: 91,
          low: 87,
          close: 88,
          volume: 2900,
        },
        {
          time: 1735690740,
          open: 88,
          high: 90,
          low: 86,
          close: 87,
          volume: 3000,
        },
      ],
      timeframe: {
        unit: 'm',
        value: 1,
      },
      timezone: 'UTC',
    },
  },
};
