export class LocalStorageService {

  setTodoList(list: string, storage: string) {
    localStorage.setItem(storage, list);
  }

  getTodoList(storage) {
    return localStorage.getItem(storage);
  }
}
