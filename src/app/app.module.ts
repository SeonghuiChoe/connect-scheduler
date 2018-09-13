import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { TodoPage } from '../components/todo-page/todo-page.component';
import { dayPage } from '../components/day-page/day-page.component';

// Services
import { LocalStorageService } from '../services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoPage,
    dayPage,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTabsModule,
  ],
  providers: [
    LocalStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
