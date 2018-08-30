import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

// Components
import { AppComponent } from './app.component';
import { TodoPage } from '../components/todo-page/todo-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoPage,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
