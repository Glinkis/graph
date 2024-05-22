// Function generics require `any` types.
// biome-ignore lint/suspicious/noExplicitAny:
type Callback = (...args: any[]) => void;

/**
 * A rudimentary event emitter.
 */
export class EventEmitter<EventMap extends Record<string, Callback>> {
  private listeners = new Map<keyof EventMap, Set<Callback>>();

  public on<Event extends keyof EventMap>(
    event: Event,
    listener: EventMap[Event],
  ) {
    const currentListeners = this.listeners.get(event);

    if (currentListeners) {
      currentListeners.add(listener);
      return;
    }

    this.listeners.set(event, new Set([listener]));
  }

  public off<Event extends keyof EventMap>(
    event: Event,
    listener: EventMap[Event],
  ) {
    const currentListeners = this.listeners.get(event);

    if (currentListeners) {
      currentListeners.delete(listener);
    }
  }

  public emit<Event extends keyof EventMap>(
    event: Event,
    ...args: Parameters<EventMap[Event]>
  ) {
    const currentListeners = this.listeners.get(event);

    if (currentListeners) {
      for (const listener of currentListeners) {
        listener(...args);
      }
    }
  }

  public clear() {
    this.listeners.clear();
  }
}
