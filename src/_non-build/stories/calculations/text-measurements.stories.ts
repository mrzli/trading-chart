import { round } from '@gmjs/number-util';
import type { Meta, StoryObj } from '@storybook/html';
import { decoratorPadding } from '../../storybook-utils';

interface Props {
  readonly fontSize: number;
  readonly fontFamily: string;
  readonly text: string;
}

const STORY_META: Meta<Props> = {
  title: 'Calculations/Text Measurements',
  tags: [],
  decorators: [decoratorPadding(document, '16px')],
  argTypes: {
    fontFamily: {
      control: 'inline-radio',
      options: ['sans-serif', 'Courier New', 'monospace'],
    },
  },
  args: {},
};
export default STORY_META;

const PRECISION = 2;
const FRACTION_PRECISION = 4;

export const Values: StoryObj<Props> = {
  render: (args: Props): HTMLElement => {
    const { fontSize, text } = args;

    const container = document.createElement('div');
    const canvas = createCanvas(document);
    container.append(canvas);
    container.append(document.createElement('br'));

    const c = canvas.getContext('2d')!;

    setCanvasStyles(c, args);

    c.fillText(text, 50, 50);

    const tm = c.measureText(text);
    const numChars = text.length;

    const width = round(tm.width, PRECISION);
    const widthPerChar = numChars > 0 ? round(width / numChars, PRECISION) : 0;
    const eachCharWidthsRaw = measureEachCharWidth(c, text);
    const eachCharWidths = eachCharWidthsRaw.map((w) => round(w, PRECISION));
    const eachCharWidthsFractionOfFontSize = eachCharWidthsRaw.map((w) =>
      round(w / fontSize, FRACTION_PRECISION),
    );
    const fontHeight = round(
      tm.fontBoundingBoxAscent + tm.fontBoundingBoxDescent,
      PRECISION,
    );
    const actualHeight = round(
      tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent,
      PRECISION,
    );

    const displays: readonly string[] = [
      `Width: ${width}`,
      `Width per char: ${widthPerChar}`,
      `Each char widths: ${JSON.stringify(eachCharWidths)}`,
      `Each char widths as fraction of font size: ${JSON.stringify(
        eachCharWidthsFractionOfFontSize,
      )}`,
      `Font height: ${fontHeight}`,
      `Actual height: ${actualHeight}`,
    ];

    for (const display of displays) {
      const div = createTextDiv(document);
      div.textContent = display;
      container.append(div);
    }

    return container;
  },
  args: {
    fontSize: 12,
    fontFamily: 'Arial',
    text: 'Hello, world!',
  },
};

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

function measureEachCharWidth(
  c: CanvasRenderingContext2D,
  text: string,
): readonly number[] {
  const widths: number[] = [];

  for (let i = 1; i <= text.length; i++) {
    const tm = c.measureText(text.slice(0, i));
    const tmSmaller = c.measureText(text.slice(0, i - 1));
    const currChartWidth = tm.width - tmSmaller.width;
    widths.push(currChartWidth);
  }

  return widths;
}
