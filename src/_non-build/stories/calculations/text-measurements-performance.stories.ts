import type { Meta, StoryObj } from '@storybook/html';
import { decoratorPadding } from '../../storybook-utils';
import {
  measurePeformanceTime,
  measureTextHeight,
  measureTextWidth,
} from '../../../chart';

interface Props {
  readonly fontSize: number;
  readonly fontFamily: string;
  readonly text: string;
  readonly iterations: number;
}

const STORY_META: Meta<Props> = {
  title: 'Calculations/Text Measurements Performance',
  tags: [],
  decorators: [decoratorPadding(document, '16px')],
  argTypes: {
    fontFamily: {
      control: 'inline-radio',
      options: ['sans-serif', 'Courier New'],
    },
    iterations: {
      control: { type: 'number', min: 1, max: 10_000_000 },
    },
  },
  args: {
    fontSize: 12,
    fontFamily: 'sans-serif',
    text: 'Hello, world!',
    iterations: 10_000,
  },
};
export default STORY_META;

export const Width: StoryObj<Props> = {
  render: (args: Props): HTMLElement => {
    let result = 0;
    return renderPerformanceComparer(
      args,
      (c) => {
        for (let i = 0; i < args.iterations; i++) {
          result = c.measureText(args.text).width;
        }
      },
      () => {
        for (let i = 0; i < args.iterations; i++) {
          result = measureTextWidth(args.fontFamily, args.fontSize, args.text);
        }
      },
    );
  },
};

export const Height: StoryObj<Props> = {
  render: (args: Props): HTMLElement => {
    let result = 0;
    return renderPerformanceComparer(
      args,
      (c) => {
        for (let i = 0; i < args.iterations; i++) {
          const tm = c.measureText(args.text);
          result = tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent;
        }
      },
      () => {
        for (let i = 0; i < args.iterations; i++) {
          result = measureTextHeight(args.fontFamily, args.fontSize);
        }
      },
    );
  },
};

function renderPerformanceComparer(
  args: Props,
  defaultFunction: (c: CanvasRenderingContext2D) => void,
  customFunction: () => void,
): HTMLElement {
  const { fontFamily, fontSize, text, iterations } = args;

  const container = document.createElement('div');
  const canvas = createCanvas(document);
  container.append(canvas);
  container.append(document.createElement('br'));

  const c = canvas.getContext('2d')!;
  setCanvasStyles(c, args);

  const defaultMeasurementsResult = measurePeformanceTime(() =>
    defaultFunction(c),
  );

  const customMeasurementsResult = measurePeformanceTime(() =>
    customFunction(),
  );

  const displays: readonly string[] = [
    `Default performance: ${defaultMeasurementsResult}ms`,
    `Custom performance: ${customMeasurementsResult}ms`,
  ];

  for (const display of displays) {
    const div = createTextDiv(document);
    div.textContent = display;
    container.append(div);
  }

  return container;
}

function createCanvas(document: Document): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 200;
  canvas.style.backgroundColor = '#eeeeee';

  return canvas;
}

function setCanvasStyles(c: CanvasRenderingContext2D, args: Props): void {
  const { fontSize, fontFamily } = args;

  c.font = `${fontSize}px ${fontFamily}`;
  c.fillStyle = 'black';
}

function createTextDiv(document: Document): HTMLDivElement {
  const div = document.createElement('div');
  return div;
}
