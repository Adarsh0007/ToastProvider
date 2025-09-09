const EventBus = {
  events: {},
  on(event, listner) {
    (this.events[event] ||= []).push(listner);
  },
  off(event, listner) {
    this.events[event] = this.events[event]?.filter((l) => l !== listner);
  },
  emit(event, data) {
    (this.events[event] || []).forEach((listner) => listner(data));
  },
};

export default EventBus;
