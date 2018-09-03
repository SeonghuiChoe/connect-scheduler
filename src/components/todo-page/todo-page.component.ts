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
    // tag정보
    this.todos = [
      { name: 'Fixing bug #9239 on test project', isDone: false },
      { name: 'Pay internet bills', isDone: true }
    ];
    // console.log(JSON.stringify(this.todos));
  }
}
