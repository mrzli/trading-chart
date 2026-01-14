import type { Meta, StoryObj } from '@storybook/html-vite';
import { drawToCanvas } from '../../html-canvas-draw';
import type { DrawItemBatch } from '../../types';
import { createExampleCanvas } from '../util';

interface DrawToCanvasStoryArgs {
  readonly width: number;
  readonly height: number;
  readonly padding: number;
  readonly showLabel: boolean;
}

const meta = {
  title: 'Drawing/drawToCanvas',
  tags: ['autodocs'],
  render: (args) => {
    const { width, height } = args;

    const { root, canvas } = createExampleCanvas(width, height);
    drawToCanvas(canvas, createDemoBatch(args));

    return root;
  },
  argTypes: {
    width: { control: { type: 'number', min: 100, max: 1200, step: 10 } },
    height: { control: { type: 'number', min: 80, max: 800, step: 10 } },
    padding: { control: { type: 'number', min: 0, max: 80, step: 1 } },
    showLabel: { control: 'boolean' },
  },
  args: {
    width: 720,
    height: 320,
    padding: 28,
    showLabel: true,
  },
} satisfies Meta<DrawToCanvasStoryArgs>;

export default meta;

type Story = StoryObj<DrawToCanvasStoryArgs>;

export const Basic: Story = {};

function createDemoBatch(args: DrawToCanvasStoryArgs): DrawItemBatch {
  const { width, height } = args;
  const padding = clamp(args.padding, 0, Math.min(width, height) / 2);

  const values = [100, 104, 98, 112, 109, 118, 114, 125, 121, 132];
  const min = Math.min(...values);
  const max = Math.max(...values);

  const x0 = padding;
  const y0 = padding;
  const w = Math.max(1, width - padding * 2);
  const h = Math.max(1, height - padding * 2);

  const lineCommands = values.map((v, i) => {
    const x = x0 + (i / Math.max(1, values.length - 1)) * w;
    const t = max === min ? 0.5 : (v - min) / (max - min);
    const y = y0 + (1 - t) * h;

    return i === 0
      ? ({ kind: 'move-to', x, y } as const)
      : ({ kind: 'line-to', x, y } as const);
  });

  const lastValue = values[values.length - 1] ?? 0;
  const lastPoint = lineCommands[lineCommands.length - 1] as
    | { kind: 'move-to'; x: number; y: number }
    | { kind: 'line-to'; x: number; y: number }
    | undefined;

  const gridCount = 4;
  const gridLines = Array.from({ length: gridCount + 1 }, (_, i) => {
    const y = y0 + (i / gridCount) * h;
    return {
      kind: 'path' as const,
      operation: 'stroke' as const,
      commands: [
        { kind: 'move-to' as const, x: x0, y },
        { kind: 'line-to' as const, x: x0 + w, y },
      ],
    };
  });

  const items: DrawItemBatch['items'] = [
    {
      kind: 'clear',
      area: { x: 0, y: 0, width, height },
    },
    {
      kind: 'batch',
      style: {
        fillStrokeStyle: { fillStyle: '#ffffff' },
      },
      items: [
        {
          kind: 'path',
          operation: 'fill',
          commands: [{ kind: 'rect', x: 0, y: 0, width, height }],
        },
      ],
    },
    {
      kind: 'batch',
      style: {
        fillStrokeStyle: { strokeStyle: '#e5e7eb' },
        pathStyle: { lineWidth: 1 },
      },
      items: gridLines,
    },
    {
      kind: 'batch',
      style: {
        fillStrokeStyle: { strokeStyle: '#2563eb' },
        pathStyle: { lineWidth: 2 },
      },
      items: [
        {
          kind: 'path',
          operation: 'stroke',
          commands: lineCommands,
        },
      ],
    },
    ...createOptionalLabelItems({
      showLabel: args.showLabel,
      lastPoint,
      lastValue,
      padding,
      width,
      height,
    }),
  ];

  return {
    kind: 'batch',
    items,
  };
}

function createOptionalLabelItems(args: {
  showLabel: boolean;
  lastPoint:
    | { kind: 'move-to'; x: number; y: number }
    | { kind: 'line-to'; x: number; y: number }
    | undefined;
  lastValue: number;
  padding: number;
  width: number;
  height: number;
}): DrawItemBatch['items'] {
  const { showLabel, lastPoint, lastValue, padding, width, height } = args;

  if (!showLabel || lastPoint === undefined) {
    return [];
  }

  const labelText = `${lastValue}`;
  const labelX = clamp(lastPoint.x + 10, padding, width - padding);
  const labelY = clamp(lastPoint.y - 10, padding, height - padding);

  return [
    {
      kind: 'batch',
      style: {
        fillStrokeStyle: { fillStyle: '#f9fafb', strokeStyle: '#d1d5db' },
        pathStyle: { lineWidth: 1 },
        textStyle: {
          font: { family: 'system-ui, sans-serif', size: 12, weight: 500 },
          horizontalAlign: 'left',
          verticalAlign: 'top',
        },
      },
      items: [
        {
          kind: 'text-box',
          text: labelText,
          x: labelX,
          y: labelY,
          operation: 'fill-stroke',
          boxPadding: { top: 4, right: 6, bottom: 4, left: 6 },
        },
        {
          kind: 'text',
          text: labelText,
          x: labelX,
          y: labelY,
        },
      ],
    },
    {
      kind: 'batch',
      style: {
        fillStrokeStyle: { fillStyle: '#111827' },
        textStyle: {
          font: { family: 'system-ui, sans-serif', size: 12, weight: 500 },
          horizontalAlign: 'left',
          verticalAlign: 'top',
        },
      },
      items: [
        {
          kind: 'text',
          text: labelText,
          x: labelX,
          y: labelY,
        },
      ],
    },
  ];
}

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) {
    return min;
  }
  return Math.max(min, Math.min(max, value));
}
