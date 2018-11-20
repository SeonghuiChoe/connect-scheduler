export class LocalStorageService {

  private LOCAL_HOLIDAYS = 'LOCAL_HOLIDAYS';

  private LOCAL_SCHEDULE = 'LOCAL_SCHEDULE';

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

  setSchedule(schedule: string) {
    localStorage.setItem(this.LOCAL_SCHEDULE, schedule);
  }

  getSchedule() {
    return localStorage.getItem(this.LOCAL_SCHEDULE);
  }
}
