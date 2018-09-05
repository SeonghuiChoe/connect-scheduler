import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})

export class TodoPage {

  todos: Array<Object> = [];
  constructor(private localStorageService: LocalStorageService) {
    this.todos = JSON.parse(localStorageService.getTodoList());
    // tag정보
    // localStorageService.setTodoList(JSON.stringify(this.todos));
  }
}
