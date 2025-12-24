import {
  FontWeight,
  TextAlignHorizontal,
  TextAlignVertical,
} from '../simple-types';

export interface TextStyle {
  readonly font?: FontStyle;
  readonly horizontalAlign?: TextAlignHorizontal;
  readonly verticalAlign?: TextAlignVertical;
}

export interface FontStyle {
  readonly family?: string;
  readonly size?: number;
  readonly weight?: FontWeight;
}
