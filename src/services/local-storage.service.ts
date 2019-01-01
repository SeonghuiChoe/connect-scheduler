export class LocalStorageService {

  private LOCAL_HOLIDAYS = 'LOCAL_HOLIDAYS';

  private LOCAL_SCHEDULES = 'LOCAL_SCHEDULES';

  setTodoList(list: string, storage: string) {
    localStorage.setItem(storage, list);
  }

  getTodoList(storage) {
    return localStorage.getItem(storage);
  }

  setHolidays(holidays: string) {
    localStorage.setItem(this.LOCAL_HOLIDAYS, holidays);
  }

  getHolidays() {
    return localStorage.getItem(this.LOCAL_HOLIDAYS);
  }

  setSchedules(schedules: string) {
    localStorage.setItem(this.LOCAL_SCHEDULES, schedules);
  }

  getSchedules() {
    return localStorage.getItem(this.LOCAL_SCHEDULES);
  }
}
