import { Meta, StoryObj } from '@storybook/html';
import {
  CreateCanvasInput,
  createCanvas,
  decoratorPadding,
  drawDot,
} from '../../storybook-utils';
import {
  BoxedTextParameters,
  LIST_OF_CANVAS_TEXT_ALIGNS,
  LIST_OF_CANVAS_TEXT_BASELINES,
  LIST_OF_FONT_FAMILIES,
  LIST_OF_SHAPE_DRAW_TYPES,
  drawBoxedText,
} from '../../../chart';

const STORY_META: Meta<BoxedTextParameters> = {
  title: 'Canvas/Boxed Text',
  tags: [],
  decorators: [decoratorPadding(document, '16px')],
  argTypes: {
    fontFamily: {
      control: 'inline-radio',
      options: LIST_OF_FONT_FAMILIES,
    },
    color: {
      control: 'color',
    },
    boxDrawType: {
      control: 'inline-radio',
      options: LIST_OF_SHAPE_DRAW_TYPES,
    },
    boxStrokeColor: {
      control: 'color',
    },
    boxFillColor: {
      control: 'color',
    },
    textAlign: {
      control: 'inline-radio',
      options: LIST_OF_CANVAS_TEXT_ALIGNS,
    },
    textBaseline: {
      control: 'inline-radio',
      options: LIST_OF_CANVAS_TEXT_BASELINES,
    },
  },
  args: {},
};
export default STORY_META;

export const Primary: StoryObj<BoxedTextParameters> = {
  render: (args: BoxedTextParameters): HTMLElement => {
    const container = document.createElement('div');

    const canvasInput: CreateCanvasInput = {
      width: 600,
      height: 200,
      backgroundColor: '#eeeeee',
    };

    const canvas = createCanvas(document, canvasInput);
    container.append(canvas);

    const c = canvas.getContext('2d')!;

    const params: BoxedTextParameters = {
      ...args,
    };

    drawBoxedText(c, params);

    drawDot(c, args.x, args.y);

    return container;
  },
  args: {
    x: 200,
    y: 50,
    fontSize: 24,
    fontFamily: 'sans-serif',
    color: 'black',
    text: 'Hello, World!',
    padding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
    boxDrawType: 'fill-and-stroke',
    boxStrokeColor: 'black',
    boxStrokeThickness: 1,
    boxStrokeDashPattern: [],
    boxStrokeDashOffset: 0,
    boxFillColor: 'orange',
  },
};
