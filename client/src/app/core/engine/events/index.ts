type Handler<Payload> = (payload: Payload) => void;

export type EventMap = Record<string, unknown>;

export class EngineEvents<E extends EventMap> {
  private listeners = new Map<keyof E, Set<Handler<any>>>();

  on<K extends keyof E>(type: K, handler: Handler<E[K]>): () => void {
    const set = this.listeners.get(type) ?? new Set();
    set.add(handler as Handler<any>);
    this.listeners.set(type, set);
    // return convenient unsubscribe
    return () => this.off(type, handler);
  }

  once<K extends keyof E>(type: K, handler: Handler<E[K]>): () => void {
    const off = this.on(type, (payload) => {
      off();
      handler(payload);
    });
    return off;
  }

  off<K extends keyof E>(type: K, handler: Handler<E[K]>): void {
    const set = this.listeners.get(type);
    if (!set) return;
    set.delete(handler as Handler<any>);
    if (set.size === 0) this.listeners.delete(type);
  }

  emit<K extends keyof E>(type: K, payload: E[K]): void {
    const set = this.listeners.get(type);
    if (!set) return;
    // copy to avoid mutation during emit
    [...set].forEach((fn) => fn(payload));
  }

  /** Await the next event of a given type (handy for flows/tests). */
  waitFor<K extends keyof E>(type: K): Promise<E[K]> {
    return new Promise((resolve) => {
      const off = this.on(type, (p) => {
        off();
        resolve(p);
      });
    });
  }

  /** Optional: clear all listeners (e.g., on scene destroy). */
  clear() {
    this.listeners.clear();
  }
}
