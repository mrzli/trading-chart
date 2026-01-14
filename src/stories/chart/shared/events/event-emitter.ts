export type EventListener<T> = (data: T) => void;
export type EventUnsubscriber = () => void;

export interface EventEmitter<T> {
  on: (callback: EventListener<T>) => EventUnsubscriber;
  emit: (data: T) => void;
  clear: () => void;
}

export function createEventEmitter<T>(): EventEmitter<T> {
  const listeners: EventListener<T>[] = [];

  return {
    on: (callback: EventListener<T>): EventUnsubscriber => {
      listeners.push(callback);

      return () => {
        const idx = listeners.indexOf(callback);
        if (idx !== -1) {
          listeners.splice(idx, 1);
        }
      };
    },

    emit: (data: T): void => {
      // Copy because listeners might unsubscribe during emission.
      [...listeners].forEach((cb) => {
        cb(data);
      });
    },

    clear: (): void => {
      listeners.length = 0;
    },
  };
}
