import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
  }
}
