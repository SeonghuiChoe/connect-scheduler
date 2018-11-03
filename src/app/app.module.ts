import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { TodoPage } from '../components/todo-page/todo-page.component';
import { DayPage } from '../components/day-page/day-page.component';

// Services
import { LocalStorageService } from '../services/local-storage.service';

// Directive
import { AutofocusDirective } from '../directive/auto-focus.directive';

@NgModule({
  declarations: [
    AppComponent,
    AutofocusDirective,
    TodoPage,
    DayPage,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
  ],
  providers: [
    LocalStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
