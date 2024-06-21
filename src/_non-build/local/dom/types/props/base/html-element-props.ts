import { ElementCSSInlineStyleProps } from './element-css-inline-style-props';
import { ElementProps } from './element-props';
import { HTMLOrSVGElementProps } from './html-or-svg-element-props';

export interface HTMLElementProps
  extends ElementProps,
    ElementCSSInlineStyleProps,
    HTMLOrSVGElementProps {}
