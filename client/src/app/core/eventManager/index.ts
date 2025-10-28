import { EventPayloads } from "@/enums/userEventEnums";

type Handler<T> = (payload: T) => void;

export default class EventManager<
  Events extends Record<string, any> = EventPayloads
> {
  // Map eventName -> Set of handlers
  private handlers = new Map<keyof Events, Set<Handler<any>>>();

  // subscribe
  on<K extends keyof Events>(
    eventName: K,
    handler: Handler<Events[K]>
  ): () => void {
    let set = this.handlers.get(eventName);
    if (!set) {
      set = new Set();
      this.handlers.set(eventName, set);
    }
    // cast is safe thanks to generics
    (set as Set<Handler<Events[K]>>).add(handler);
    // return an unsubscribe function for convenience
    return () => this.off(eventName, handler);
  }

  // subscribe once
  once<K extends keyof Events>(
    eventName: K,
    handler: Handler<Events[K]>
  ): () => void {
    const wrapper: Handler<Events[K]> = (payload) => {
      try {
        handler(payload);
      } finally {
        this.off(eventName, wrapper);
      }
    };
    return this.on(eventName, wrapper);
  }

  // unsubscribe
  off<K extends keyof Events>(
    eventName: K,
    handler?: Handler<Events[K]>
  ): void {
    const set = this.handlers.get(eventName);
    if (!set) return;

    if (!handler) {
      // remove all handlers for this event
      set.clear();
      this.handlers.delete(eventName);
      return;
    }

    set.delete(handler as Handler<any>);
    if (set.size === 0) this.handlers.delete(eventName);
  }

  // emit
  emit<K extends keyof Events>(eventName: K, payload: Events[K]): void {
    const set = this.handlers.get(eventName);
    if (!set || set.size === 0) return;

    // Iterate over copy to allow handlers to remove themselves safely
    const handlersCopy = Array.from(set) as Handler<Events[K]>[];
    for (const h of handlersCopy) {
      try {
        h(payload);
      } catch (err) {
        // Optionally: log errors. Don't let one handler break others.
        console.error(
          `[EventManager] handler error for ${String(eventName)}:`,
          err
        );
      }
    }
  }

  // convenience: remove all listeners
  clearAll(): void {
    this.handlers.clear();
  }
}
