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
    this.todos = JSON.parse(localStorageService.getTodoList());
    // tag정보
  }

  insertTodo() {
    this.todos.push({
      name: this.insertText,
      isDone: false
    });
    this.localStorageService.setTodoList(JSON.stringify(this.todos));
    this.insertText = '';
  }
}
