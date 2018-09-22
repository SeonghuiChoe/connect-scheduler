import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})

export class TodoPage {

  insertText = '';

  todos: Array<Object> = [];
  constructor(private localStorageService: LocalStorageService) {
    // tag정보
    if (localStorageService.getTodoList()) {
      this.todos = JSON.parse(localStorageService.getTodoList());
    } else {
      this.setStorage();
    }
  }

  private setStorage() {
    this.localStorageService.setTodoList(JSON.stringify(this.todos));
  }

  insertTodo() {
    if (!this.insertText) {
      // 입력해주세요.
      return;
    }
    this.todos.push({
      name: this.insertText,
      isDone: false,
      isStar: false
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
}
