import type { Meta, StoryObj } from '@storybook/html-vite';
import {
  renderTradingChartExplicit,
  TradingChartInputExplicit,
} from '../../chart';
import { drawToCanvas } from '../../html-canvas-draw';
import { DrawItemBatch, Size } from '../../types';
import { createChartDom, createExampleCanvas, fullscreenDecorator } from '../util';
import {
  createEventEmitter,
  DomEventName,
  getExamplePluginsAll,
  getExamplePluginsMain,
  getExamplePluginsOverlay,
  getExampleTradingChartInput,
  subscribeToDom,
  subscribeToResize,
  UiEvent,
} from './shared';

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

export const MainWithOverlay: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [fullscreenDecorator],
  render: (args) => {
    const input = args.input;

    const { root, chartMain, chartOverlay } = createChartDom();

    const pluginsMain = getExamplePluginsMain();
    const pluginsOverlay = getExamplePluginsOverlay();

    const eventEmitter = createEventEmitter<UiEvent>();

    subscribeToResize(eventEmitter, root);
    const domEvents: readonly DomEventName[] = ['mousemove'];
    domEvents.forEach((eventType) => {
      subscribeToDom(eventEmitter, root, eventType);
    });

    eventEmitter.on((event) => {
      const size = getSizeFromResizeEvent(event);
      if (size) {
        console.log('Resizing canvases to', size);
        updateCanvas(chartMain, size);
        //updateCanvas(chartOverlay, size);
      }

      const finalInput = getFinalInput(input, event);
      console.log('Rendering with input size', finalInput.size);

      const { batch: batchMain } = renderTradingChartExplicit(
        finalInput,
        pluginsMain,
      );
      const batchObjectMain: DrawItemBatch = {
        kind: 'batch',
        items: batchMain,
      };

      drawToCanvas(chartMain, batchObjectMain);

      // const { batch: batchOverlay } = renderTradingChartExplicit(
      //   finalInput,
      //   pluginsOverlay,
      // );
      // const batchObjectOverlay: DrawItemBatch = {
      //   kind: 'batch',
      //   items: batchOverlay,
      // };

      // drawToCanvas(chartOverlay, batchObjectOverlay);
    });

    return root;
  },
  args: {
    input: getExampleTradingChartInput(),
  },
};

function getFinalInput(
  input: TradingChartInputExplicit,
  event: UiEvent,
): TradingChartInputExplicit {
  if (event.kind === 'resize') {
    const size = getSizeFromResizeEvent(event);
    if (size) {
      return {
        ...input,
        size,
      };
    }

    return input;
  } else if (event.kind === 'dom') {
    return input;
  } else {
    return input;
  }
}

function getSizeFromResizeEvent(event: UiEvent): Size | undefined {
  if (event.kind === 'resize') {
    const entry = event.event;
    const borderBoxSize = entry.borderBoxSize?.[0];
    if (borderBoxSize) {
      return {
        width: borderBoxSize.inlineSize,
        height: borderBoxSize.blockSize,
      };
    }
  }
  return undefined;
}

function updateCanvas(
  canvas: HTMLCanvasElement,
  size: Size,
): void {
  if (canvas.width !== size.width) {
    canvas.width = size.width;
  }
  if (canvas.height !== size.height) {
    canvas.height = size.height;
  }
  // if (canvas.style.cursor !== cursor) {
  //   canvas.style.cursor = cursor;
  // }
}
