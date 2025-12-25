import type { Meta, StoryObj } from '@storybook/html-vite';
import { drawToCanvas } from '../html-canvas-draw';
import { createExampleCanvas } from './util';
import {
  renderTradingChartExplicit,
  RenderTradingChartInputExplicit,
} from '../chart';

interface TradingChartStoryArgs {
  readonly input: RenderTradingChartInputExplicit;
}

const meta = {
  title: 'Chart/tradingChart',
  tags: ['autodocs'],
  render: (args) => {
    const input = args.input;
    const { width, height } = input.size;

    const { root, canvas } = createExampleCanvas(width, height);
    const { batch } = renderTradingChartExplicit(input);
    drawToCanvas(canvas, batch);

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
