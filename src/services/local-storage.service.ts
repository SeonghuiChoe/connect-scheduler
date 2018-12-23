export class LocalStorageService {

  private LOCAL_EVENTS = 'LOCAL_EVENTS';

  setTodoList(list: string, storage: string) {
    localStorage.setItem(storage, list);
  }

  getTodoList(storage) {
    return localStorage.getItem(storage);
  }

  setEvents(events: string) {
    localStorage.setItem(this.LOCAL_EVENTS, events);
  }

  getEvents() {
    return localStorage.getItem(this.LOCAL_EVENTS);
  }
}
