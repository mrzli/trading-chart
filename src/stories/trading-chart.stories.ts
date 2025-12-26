import type { Meta, StoryObj } from '@storybook/html-vite';
import { drawToCanvas } from '../html-canvas-draw';
import { createExampleCanvas } from './util';
import {
  pluginClear,
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
      pluginClear('clear', 0),
      pluginExample('example', 1),
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
    },
  },
};
