export class Signal<T> {
  private _value: T;
  private listeners: Set<(value: T) => void>;

  constructor(initialValue: T) {
    this._value = initialValue;
    this.listeners = new Set();
  }

  get(): T {
    return this._value;
  }

  set(newValue: T): void {
    this._value = newValue;
    this.listeners.forEach(listener => listener(newValue));
  }

  subscribe(listener: (value: T) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener); // unsubscribe function
  }
}

