import { Meta, StoryObj } from '@storybook/html';
import {
  CreateCanvasInput,
  createCanvas,
  decoratorPadding,
} from '../../storybook-utils';

interface Props {
  readonly x: number;
  readonly y: number;
  readonly fontSize: number;
  readonly fontFamily: string;
  readonly strokeStyle: string;
  readonly fillStyle: string;
  readonly text: string;
}

const STORY_META: Meta<Props> = {
  title: 'Canvas/Text',
  tags: [],
  decorators: [decoratorPadding(document, '16px')],
  argTypes: {
    fontFamily: {
      control: 'inline-radio',
      options: ['sans-serif', 'Courier New', 'monospace'],
    },
    strokeStyle: {
      control: 'color',
    },
    fillStyle: {
      control: 'color',
    },
  },
  args: {},
};
export default STORY_META;

export const Primary: StoryObj<Props> = {
  render: (args: Props): HTMLElement => {
    const { x, y, fontSize, fontFamily, strokeStyle, fillStyle, text } = args;

    const container = document.createElement('div');

    const canvasInput: CreateCanvasInput = {
      width: 600,
      height: 200,
      backgroundColor: '#eeeeee',
    };

    const canvas = createCanvas(document, canvasInput);
    container.append(canvas);
    container.append(document.createElement('br'));

    const c = canvas.getContext('2d')!;

    c.font = `${fontSize}px ${fontFamily}`;
    c.strokeStyle = strokeStyle;
    c.fillStyle = fillStyle;

    c.fillText(text, x, y);

    return container;
  },
  args: {
    x: 50,
    y: 50,
    fontSize: 24,
    fontFamily: 'sans-serif',
    strokeStyle: 'black',
    fillStyle: 'black',
    text: 'Hello, World!',
  },
};
