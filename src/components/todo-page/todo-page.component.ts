import { Component, Input } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})

export class TodoPage {

  @Input('storage') storage: string;

  @Input('showStar') showStar: boolean = true;

  @Input('showCheckbox') showCheckbox: boolean = true;

  insertText: string = '';

  todos: Array<Object> = [];
  constructor(private localStorageService: LocalStorageService) {}

  /**
   * Storage에서 가져오기
   */
  ngOnInit() {
    if (this.localStorageService.getTodoList(this.storage)) {
      this.todos = JSON.parse(this.localStorageService
        .getTodoList(this.storage))
        .map(todo => new Todo(
          todo._content,
          todo._isDone,
          todo._isStar,
          todo._editable
        ));
    } else {
      this.setStorage();
    }
  }

  /**
   * Storage에 저장
   */
  private setStorage() {
    this.localStorageService.setTodoList(JSON.stringify(this.todos), this.storage);
  }

  /**
   * 일정 등록
   */
  insertTodo() {
    if (!this.insertText) {
      // 입력해주세요.
      return;
    }
    const todo = new Todo(this.insertText);
    this.todos.push(todo);
    this.setStorage();
    this.insertText = '';
  }

  /**
   * 일정 삭제
   */
  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.setStorage();
  }

  /**
   * 중요 여부 변경
   */
  checkStar(todo: Todo) {
    todo.isStar = !todo.isStar;
    this.setStorage();
  }

  /**
   * 완려 여부 변경
   * ng-model이기 때문에 storage만 변경
   */
  checkDone() {
    this.setStorage();
  }

  /**
   * 변경 가능으로 수정
   */
  onEditable(todo: Todo) {
    todo.editable = true;
    this.setStorage();
  }

  /**
   * 변경 불가능으로 수정
   */
  OffEditable(todo: Todo) {
    todo.editable = false;
    this.setStorage();
  }
}
