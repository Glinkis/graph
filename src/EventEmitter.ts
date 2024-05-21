type Callback = () => void;

/**
 * A rudimentary event emitter.
 */
export class EventEmitter {
  private listeners = new Map<string, Set<Callback>>();

  public on(event: string, listener: Callback) {
    const currentListeners = this.listeners.get(event);

    if (currentListeners) {
      currentListeners.add(listener);
      return;
    }

    this.listeners.set(event, new Set([listener]));
  }

  public off(event: string, listener: Callback) {
    const currentListeners = this.listeners.get(event);

    if (currentListeners) {
      currentListeners.delete(listener);
    }
  }

  public emit(event: string) {
    const currentListeners = this.listeners.get(event);

    if (currentListeners) {
      for (const listener of currentListeners) {
        listener();
      }
    }
  }
}
