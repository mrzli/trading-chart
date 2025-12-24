import { FillStrokeStyle } from './fill-stroke-style';
import { PathStyle } from './path-style';
import { TextStyle } from './text-style';

export interface DrawStyle {
  readonly fillStrokeStyle?: FillStrokeStyle;
  readonly pathStyle?: PathStyle;
  readonly textStyle?: TextStyle;
}
