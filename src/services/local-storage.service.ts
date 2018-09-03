export class LocalStorageService {
  /**
   * Todo list
   */
  private TODO_LIST: string = 'todoList';

  setTodoList(list: string) {
    localStorage.setItem(this.TODO_LIST, list);
  }

  getTodoList() {
    return localStorage.getItem(this.TODO_LIST);
  }
}
