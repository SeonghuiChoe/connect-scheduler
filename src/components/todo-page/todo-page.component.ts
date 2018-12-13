import { Component, Input } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

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

  ngOnInit() {
    if (this.localStorageService.getTodoList(this.storage)) {
      this.todos = JSON.parse(this.localStorageService.getTodoList(this.storage));
    } else {
      this.setStorage();
    }
  }

  private setStorage() {
    this.localStorageService.setTodoList(JSON.stringify(this.todos), this.storage);
  }

  insertTodo() {
    if (!this.insertText) {
      // 입력해주세요.
      return;
    }
    this.todos.push({
      name: this.insertText,
      isDone: false,
      isStar: false,
      editable: false
    });
    this.setStorage();
    this.insertText = '';
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
    this.setStorage();
  }

  checkStar(todo) {
    todo.isStar = !todo.isStar;
    this.setStorage();
  }

  checkDone() {
    this.setStorage();
  }

  onEditable(todo) {
    todo.editable = true;
    this.setStorage();
  }

  OffEditable(todo) {
    todo.editable = false;
    this.setStorage();
  }
}
