export class LocalStorageService {
  /**
   * Todo list
   */
  private TODO_LIST: string = 'todoList';

  /**
   * Today todo list
   */
  private TODAY_TODO_LIST: string = 'todayTodoList';

  /**
   * Bucket list
   */
  private BUCKET_LIST: string = 'bucketList';

  setTodoList(list: string) {
    localStorage.setItem(this.TODO_LIST, list);
  }

  getTodoList() {
    return localStorage.getItem(this.TODO_LIST);
  }

  setTodayTodoList(list: string) {
    localStorage.setItem(this.TODAY_TODO_LIST, list);
  }

  getTodayTodoList() {
    return localStorage.getItem(this.TODAY_TODO_LIST);
  }

  setBucketList(list: string) {
    localStorage.setItem(this.BUCKET_LIST, list);
  }

  getBucketList() {
    return localStorage.getItem(this.BUCKET_LIST);
  }
}
