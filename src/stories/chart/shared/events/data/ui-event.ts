import { DomEvent } from './dom-event';

export const LIST_OF_UI_EVENT_KINDS = ['resize', 'dom'] as const;

export type UiEventKind = (typeof LIST_OF_UI_EVENT_KINDS)[number];

export interface UiEventBase {
  readonly kind: UiEventKind;
}

export interface UiEventResize extends UiEventBase {
  readonly kind: 'resize';
  readonly event: ResizeObserverEntry;
}

export interface UiEventDom extends UiEventBase {
  readonly kind: 'dom';
  readonly event: DomEvent;
}

export type UiEvent = UiEventResize | UiEventDom;
