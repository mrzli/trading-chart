export interface HtmlElementWrapper<TElement extends HTMLElement> {
  readonly getDocument: () => Document;
  readonly getElement: () => TElement;
}
