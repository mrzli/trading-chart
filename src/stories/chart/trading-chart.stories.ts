import type { Meta, StoryObj } from '@storybook/html-vite';
import {
  renderTradingChartExplicit,
  TradingChartInputExplicit,
} from '../../chart';
import { drawToCanvas } from '../../html-canvas-draw';
import { DrawItemBatch } from '../../types';
import { createExampleCanvas } from '../util';
import { getExamplePluginsAll, getExampleTradingChartInput } from './shared';

interface TradingChartStoryArgs {
  readonly input: TradingChartInputExplicit;
}

const meta = {
  title: 'Chart/Trading Chart',
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<TradingChartStoryArgs>;

export default meta;

type Story = StoryObj<TradingChartStoryArgs>;

export const Basic: Story = {
  render: (args) => {
    const input = args.input;
    const { width, height } = input.size;

    const { root, canvas } = createExampleCanvas(width, height);

    const plugins = getExamplePluginsAll();

    const { batch } = renderTradingChartExplicit(input, plugins);
    const batchObject: DrawItemBatch = { kind: 'batch', items: batch };

    drawToCanvas(canvas, batchObject);

    return root;
  },
  args: {
    input: getExampleTradingChartInput(),
  },
};
