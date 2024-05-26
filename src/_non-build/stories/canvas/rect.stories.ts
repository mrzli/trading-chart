import { Meta, StoryObj } from '@storybook/html';
import {
  CreateCanvasInput,
  createCanvas,
  decoratorPadding,
} from '../../storybook-utils';
import {
  LIST_OF_SHAPE_DRAW_TYPES,
  RectParameters,
  drawRect,
} from '../../../chart';

const STORY_META: Meta<RectParameters> = {
  title: 'Canvas/Rect',
  tags: [],
  decorators: [decoratorPadding(document, '16px')],
  argTypes: {
    drawType: {
      control: 'inline-radio',
      options: LIST_OF_SHAPE_DRAW_TYPES,
    },
    strokeColor: {
      control: 'color',
    },
    fillColor: {
      control: 'color',
    },
  },
  args: {},
};
export default STORY_META;

export const Primary: StoryObj<RectParameters> = {
  render: (args: RectParameters): HTMLElement => {
    const container = document.createElement('div');

    const canvasInput: CreateCanvasInput = {
      width: 800,
      height: 600,
      backgroundColor: '#eeeeee',
    };

    const canvas = createCanvas(document, canvasInput);
    container.append(canvas);

    const c = canvas.getContext('2d')!;

    const params: RectParameters = {
      ...args,
    };

    drawRect(c, params);

    return container;
  },
  args: {
    x: 50,
    y: 50,
    width: 400,
    height: 400,
    drawType: 'fill-and-stroke',
    strokeColor: 'black',
    strokeThickness: 1,
    strokeDashPattern: [],
    strokeDashOffset: 0,
    fillColor: 'orange',
  },
};
