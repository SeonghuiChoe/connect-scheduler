import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule} from '@angular/material';

// Components
import { AppComponent } from './app.component';
import { TodoPage } from '../components/todo-page/todo-page.component';
import { DayPage } from '../components/day-page/day-page.component';
import { DayInsertDialog } from '../components/day-insert-dialog/day-insert-dialog.component';

// Services
import { LocalStorageService } from '../services/local-storage.service';
import { HolidayService } from '../services/holiday.service';
import { AddService } from '../utils/add.service';

// Directive
import { AutofocusDirective } from '../directive/auto-focus.directive';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    AppComponent,
    AutofocusDirective,
    TodoPage,
    DayPage,
    DayInsertDialog,
  ],
  entryComponents: [
    DayInsertDialog
  ],
  providers: [
    LocalStorageService,
    HolidayService,
    AddService,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
