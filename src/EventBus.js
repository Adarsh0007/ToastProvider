const EventBus = {
  events: {},
  on(event, listener) {
    (this.events[event] ||= []).push(listener);
  },
  off(event, listener) {
    this.events[event] = this.events[event]?.filter((l) => l !== listener);
  },
  emit(event, data) {
    (this.events[event] || []).forEach((listener) => listener(data));
  },
};

export default EventBus;
