import { DomEvent, DomEventName, UiEvent } from './data';
import { EventEmitter, EventUnsubscriber } from './event-emitter';

const x: HTMLElement = document.createElement('div');

export function subscribeToResize(
  emitter: EventEmitter<UiEvent>,
  element: HTMLElement,
  options?: ResizeObserverOptions,
): EventUnsubscriber {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === element) {
        const data: UiEvent = {
          kind: 'resize',
          event: entry,
        };
        emitter.emit(data);
      }
    }
  });

  resizeObserver.observe(element, options);

  return () => {
    resizeObserver.unobserve(element);
    resizeObserver.disconnect();
  };
}

export function subscribeToDom<K extends keyof HTMLElementEventMap>(
  emitter: EventEmitter<UiEvent>,
  element: HTMLElement,
  eventType: K,
): EventUnsubscriber {
  const handler = (event: HTMLElementEventMap[K]): void => {
    const data: UiEvent = {
      kind: 'dom', 
      event: {
        kind: eventType,
        event,
      } as DomEvent,
    };
    emitter.emit(data);
  };

  element.addEventListener(eventType, handler);

  return () => {
    element.removeEventListener(eventType, handler);
  };
}
