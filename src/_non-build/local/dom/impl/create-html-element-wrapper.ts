import { HTMLElementTagNamePropsMap } from '../types';
import { HtmlElementWrapper } from '../types/html-element-wrapper';
import { createHtmlElement } from './create-html-element';

export function createHtmlElementWrapper<K extends keyof HTMLElementTagNameMap>(
  document: Document,
  tagName: K,
  props: HTMLElementTagNamePropsMap[K],
): HtmlElementWrapper<HTMLElementTagNameMap[K]> {
  const element = createHtmlElement(document, tagName, props);

  element.addEventListener('click', () => {});

  const getDocument = (): Document => document;
  const getElement = (): HTMLElementTagNameMap[K] => element;

  return { getDocument, getElement };
}
