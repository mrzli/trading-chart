import { Meta, StoryObj } from '@storybook/html';
import {
  CreateCanvasInput,
  createCanvas,
  decoratorPadding,
} from '../../storybook-utils';
import { TextParameters, drawText } from '../../../chart';

const STORY_META: Meta<TextParameters> = {
  title: 'Canvas/Text',
  tags: [],
  decorators: [decoratorPadding(document, '16px')],
  argTypes: {
    fontFamily: {
      control: 'inline-radio',
      options: ['sans-serif', 'Courier New', 'monospace'],
    },
    color: {
      control: 'color',
    },
  },
  args: {},
};
export default STORY_META;

export const Primary: StoryObj<TextParameters> = {
  render: (args: TextParameters): HTMLElement => {
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

    const params: TextParameters = {
      ...args,
    };

    drawText(c, params);

    return container;
  },
  args: {
    x: 50,
    y: 50,
    fontSize: 24,
    fontFamily: 'sans-serif',
    color: 'black',
    text: 'Hello, World!',
  },
};
