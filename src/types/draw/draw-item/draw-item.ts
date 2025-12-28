import { Point, Rect } from '../../geometry';
import { Margin } from '../../layout';
import { PathOperation } from '../simple-types';
import { DrawStyle } from '../styles';
import { DrawPathCommand } from './draw-path-command';

export const LIST_OF_DRAW_ITEM_KINDS = [
  'batch',
  'clear',
  'path',
  'text',
  'text-box',
] as const;

export type DrawItemKind = (typeof LIST_OF_DRAW_ITEM_KINDS)[number];

export interface DrawItemBase {
  readonly kind: DrawItemKind;
}

export interface DrawItemBatch extends DrawItemBase {
  readonly kind: 'batch';
  readonly offset?: Point;
  readonly clipPath?: readonly DrawPathCommand[];
  readonly style?: DrawStyle;
  readonly items: readonly DrawItem[];
}

export interface DrawItemClear extends DrawItemBase {
  readonly kind: 'clear';
  readonly area: Rect;
}

export interface DrawItemPath extends DrawItemBase {
  readonly kind: 'path';
  readonly operation: PathOperation;
  readonly commands: readonly DrawPathCommand[];
}

export interface DrawItemText extends DrawItemBase {
  readonly kind: 'text';
  readonly text: string;
  readonly x: number;
  readonly y: number;
  readonly maxWidth?: number;
}

export interface DrawItemTextBox extends DrawItemBase {
  readonly kind: 'text-box';
  readonly text: string;
  readonly x: number;
  readonly y: number;
  readonly operation: PathOperation;
  readonly boxPadding?: Margin;
}

export type DrawItem =
  | DrawItemBatch
  | DrawItemClear
  | DrawItemPath
  | DrawItemText
  | DrawItemTextBox;
