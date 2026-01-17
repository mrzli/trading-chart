import type { Meta, StoryObj } from '@storybook/html-vite';
import {
  renderTradingChartExplicit,
  TradingChartInputExplicit,
} from '../../chart';
import { drawToCanvas } from '../../html-canvas-draw';
import { DrawItemBatch, Size } from '../../types';
import {
  createChartDom,
  createExampleCanvas,
  fullscreenDecorator,
} from '../util';
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
import { isSizeEqual } from '../../util';

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

    let currentInput = input;

    eventEmitter.on((event) => {
      const size = getSizeFromResizeEvent(event);
      if (size) {
        updateCanvas(chartMain, size);
        updateCanvas(chartOverlay, size);
      }

      const newInput = getNewInput(currentInput, event);

      if (isMainInputChanged(currentInput, newInput)) {
        const { batch: batchMain } = renderTradingChartExplicit(
          newInput,
          pluginsMain,
        );
        const batchObjectMain: DrawItemBatch = {
          kind: 'batch',
          items: batchMain,
        };

        drawToCanvas(chartMain, batchObjectMain);
      }

      if (isOverlayInputChanged(currentInput, newInput)) {
        const { batch: batchOverlay } = renderTradingChartExplicit(
          newInput,
          pluginsOverlay,
        );
        const batchObjectOverlay: DrawItemBatch = {
          kind: 'batch',
          items: batchOverlay,
        };

        drawToCanvas(chartOverlay, batchObjectOverlay);
      }

      currentInput = newInput;
    });

    return root;
  },
  args: {
    input: getExampleTradingChartInput(),
  },
};

function getNewInput(
  input: TradingChartInputExplicit,
  event: UiEvent,
): TradingChartInputExplicit {
  if (event.kind === 'resize') {
    const size = getSizeFromResizeEvent(event);
    if (size && size.width > 0 && size.height > 0) {
      const segment = input.segments[0];
      const layout = input.layout;
      const newHeight =
        size.height -
        layout.xAxisHeight -
        layout.padding.top -
        layout.padding.bottom;

      const segments =
        newHeight !== segment.height
          ? [
              {
                ...segment,
                height: newHeight,
              },
            ]
          : input.segments;

      return {
        ...input,
        size,
        segments,
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

function updateCanvas(canvas: HTMLCanvasElement, size: Size): void {
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

function isMainInputChanged(
  oldInput: TradingChartInputExplicit,
  newInput: TradingChartInputExplicit,
): boolean {
  if (!isSizeEqual(oldInput.size, newInput.size)) {
    return true;
  }
  if (oldInput.layout !== newInput.layout) {
    return true;
  }
  if (oldInput.theme !== newInput.theme) {
    return true;
  }
  if (oldInput.segments !== newInput.segments) {
    return true;
  }
  if (oldInput.data !== newInput.data) {
    return true;
  }
  if (oldInput.dataVisibleSpan !== newInput.dataVisibleSpan) {
    return true;
  }
  if (oldInput.timeframe !== newInput.timeframe) {
    return true;
  }
  if (oldInput.timezone !== newInput.timezone) {
    return true;
  }
  if (oldInput.position !== newInput.position) {
    return true;
  }
  // if (oldInput.cursorPosition !== newInput.cursorPosition) {
  //   return true;
  // }
  return false;
}

function isOverlayInputChanged(
  oldInput: TradingChartInputExplicit,
  newInput: TradingChartInputExplicit,
): boolean {
  if (isMainInputChanged(oldInput, newInput)) {
    return true;
  }
  if (oldInput.cursorPosition !== newInput.cursorPosition) {
    return true;
  }
  return false;
}
