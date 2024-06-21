import { HTMLElementProps } from './base';
import { HTMLCanvasElementProps, HTMLDivElementProps } from './specific';

export interface HTMLElementTagNamePropsMap {
  readonly a: HTMLElementProps; // HTMLAnchorElementProps
  readonly abbr: HTMLElementProps;
  readonly address: HTMLElementProps;
  readonly area: HTMLElementProps; // HTMLAreaElementProps
  readonly article: HTMLElementProps;
  readonly aside: HTMLElementProps;
  readonly audio: HTMLElementProps; // HTMLAudioElementProps
  readonly b: HTMLElementProps;
  readonly base: HTMLElementProps; // HTMLBaseElementProps
  readonly bdi: HTMLElementProps;
  readonly bdo: HTMLElementProps;
  readonly blockquote: HTMLElementProps; // HTMLQuoteElementProps
  readonly body: HTMLElementProps; // HTMLBodyElementProps
  readonly br: HTMLElementProps; // HTMLBRElementProps
  readonly button: HTMLElementProps; // HTMLButtonElementProps
  readonly canvas: HTMLCanvasElementProps;
  readonly caption: HTMLElementProps; // HTMLTableCaptionElementProps
  readonly cite: HTMLElementProps;
  readonly code: HTMLElementProps;
  readonly col: HTMLElementProps; // HTMLTableColElementProps
  readonly colgroup: HTMLElementProps; // HTMLTableColElementProps
  readonly data: HTMLElementProps; // HTMLDataElementProps
  readonly datalist: HTMLElementProps; // HTMLDataListElementProps
  readonly dd: HTMLElementProps;
  readonly del: HTMLElementProps; // HTMLModElementProps
  readonly details: HTMLElementProps; // HTMLDetailsElementProps
  readonly dfn: HTMLElementProps;
  readonly dialog: HTMLElementProps; // HTMLDialogElementProps
  readonly div: HTMLDivElementProps;
  readonly dl: HTMLElementProps; // HTMLDListElementProps
  readonly dt: HTMLElementProps;
  readonly em: HTMLElementProps;
  readonly embed: HTMLElementProps; // HTMLEmbedElementProps
  readonly fieldset: HTMLElementProps; // HTMLFieldSetElementProps
  readonly figcaption: HTMLElementProps;
  readonly figure: HTMLElementProps;
  readonly footer: HTMLElementProps;
  readonly form: HTMLElementProps; // HTMLFormElementProps
  readonly h1: HTMLElementProps; // HTMLHeadingElementProps
  readonly h2: HTMLElementProps; // HTMLHeadingElementProps
  readonly h3: HTMLElementProps; // HTMLHeadingElementProps
  readonly h4: HTMLElementProps; // HTMLHeadingElementProps
  readonly h5: HTMLElementProps; // HTMLHeadingElementProps
  readonly h6: HTMLElementProps; // HTMLHeadingElementProps
  readonly head: HTMLElementProps; // HTMLHeadElementProps
  readonly header: HTMLElementProps;
  readonly hgroup: HTMLElementProps;
  readonly hr: HTMLElementProps; // HTMLHRElementProps
  readonly html: HTMLElementProps; // HTMLHtmlElementProps
  readonly i: HTMLElementProps;
  readonly iframe: HTMLElementProps; // HTMLIFrameElementProps
  readonly img: HTMLElementProps; // HTMLImageElementProps
  readonly input: HTMLElementProps; // HTMLInputElementProps
  readonly ins: HTMLElementProps; // HTMLModElementProps
  readonly kbd: HTMLElementProps;
  readonly label: HTMLElementProps; // HTMLLabelElementProps
  readonly legend: HTMLElementProps; // HTMLLegendElementProps
  readonly li: HTMLElementProps; // HTMLLIElementProps
  readonly link: HTMLElementProps; // HTMLLinkElementProps
  readonly main: HTMLElementProps;
  readonly map: HTMLElementProps; // HTMLMapElementProps
  readonly mark: HTMLElementProps;
  readonly menu: HTMLElementProps; // HTMLMenuElementProps
  readonly meta: HTMLElementProps; // HTMLMetaElementProps
  readonly meter: HTMLElementProps; // HTMLMeterElementProps
  readonly nav: HTMLElementProps;
  readonly noscript: HTMLElementProps;
  readonly object: HTMLElementProps; // HTMLObjectElementProps
  readonly ol: HTMLElementProps; // HTMLOListElementProps
  readonly optgroup: HTMLElementProps; // HTMLOptGroupElementProps
  readonly option: HTMLElementProps; // HTMLOptionElementProps
  readonly output: HTMLElementProps; // HTMLOutputElementProps
  readonly p: HTMLElementProps; // HTMLParagraphElementProps
  readonly picture: HTMLElementProps; // HTMLPictureElementProps
  readonly pre: HTMLElementProps; // HTMLPreElementProps
  readonly progress: HTMLElementProps; // HTMLProgressElementProps
  readonly q: HTMLElementProps; // HTMLQuoteElementProps
  readonly rp: HTMLElementProps;
  readonly rt: HTMLElementProps;
  readonly ruby: HTMLElementProps;
  readonly s: HTMLElementProps;
  readonly samp: HTMLElementProps;
  readonly script: HTMLElementProps; // HTMLScriptElementProps
  readonly search: HTMLElementProps;
  readonly section: HTMLElementProps;
  readonly select: HTMLElementProps; // HTMLSelectElementProps
  readonly slot: HTMLElementProps; // HTMLSlotElementProps
  readonly small: HTMLElementProps;
  readonly source: HTMLElementProps; // HTMLSourceElementProps
  readonly span: HTMLElementProps; // HTMLSpanElementProps
  readonly strong: HTMLElementProps;
  readonly style: HTMLElementProps; // HTMLStyleElementProps
  readonly sub: HTMLElementProps;
  readonly summary: HTMLElementProps;
  readonly sup: HTMLElementProps;
  readonly table: HTMLElementProps; // HTMLTableElementProps
  readonly tbody: HTMLElementProps; // HTMLTableSectionElementProps
  readonly td: HTMLElementProps; // HTMLTableCellElementProps
  readonly template: HTMLElementProps; // HTMLTemplateElementProps
  readonly textarea: HTMLElementProps; // HTMLTextAreaElementProps
  readonly tfoot: HTMLElementProps; // HTMLTableSectionElementProps
  readonly th: HTMLElementProps; // HTMLTableCellElementProps
  readonly thead: HTMLElementProps; // HTMLTableSectionElementProps
  readonly time: HTMLElementProps; // HTMLTimeElementProps
  readonly title: HTMLElementProps; // HTMLTitleElementProps
  readonly tr: HTMLElementProps; // HTMLTableRowElementProps
  readonly track: HTMLElementProps; // HTMLTrackElementProps
  readonly u: HTMLElementProps;
  readonly ul: HTMLElementProps; // HTMLUListElementProps
  readonly var: HTMLElementProps;
  readonly video: HTMLElementProps; // HTMLVideoElementProps
  readonly wbr: HTMLElementProps;
}
