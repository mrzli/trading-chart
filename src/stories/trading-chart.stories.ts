import type { Meta, StoryObj } from '@storybook/html-vite';
import { drawToCanvas } from '../html-canvas-draw';
import { createExampleCanvas } from './util';
import {
  pluginBackground,
  pluginClear,
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
      pluginYAxis({ name: 'y-axis', priority: 3 }),
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
      }
    },
  },
};
