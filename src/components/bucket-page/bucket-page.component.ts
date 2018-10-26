import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'bucket-page',
  templateUrl: './bucket-page.component.html',
  styleUrls: ['./bucket-page.component.scss']
})

export class BucketPage {

  insertText = '';

  todos: Array<Object> = [];
  constructor(private localStorageService: LocalStorageService) {
    // tag정보
    if (localStorageService.getBucketList()) {
      this.todos = JSON.parse(localStorageService.getBucketList());
    } else {
      this.setStorage();
    }
  }

  private setStorage() {
    this.localStorageService.setBucketList(JSON.stringify(this.todos));
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

  checkDone() {
    this.setStorage();
  }
}
