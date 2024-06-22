import { HTMLElementTagNamePropsMap } from '../types';

export function createHtmlElement<K extends keyof HTMLElementTagNameMap>(
  document: Document,
  tagName: K,
  props: HTMLElementTagNamePropsMap[K],
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);
  Object.assign(element, props);
  Object.assign(element.style, props.style);
  return element;
}

export function createHtmlElementFactory(document: Document) {
  return <K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    props: HTMLElementTagNamePropsMap[K],
  ): HTMLElementTagNameMap[K] => createHtmlElement(document, tagName, props);
}
