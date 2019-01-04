import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Event } from '../../models/Event';

export interface DayData {
  date: string;
  holidays: Array<Event>;
  schedules: Array<Event>;
  isNotCurrentMonthDays: boolean;
  isToday: boolean;
  isWeekend: boolean;
}

@Component({
  selector: 'day-insert-dialog.',
  templateUrl: 'day-insert-dialog.component.html',
  styleUrls: ['./day-insert-dialog.component.scss'],
})
export class DayInsertDialog {

  private event = {
    note: '',
    detail: '',
  }

  private events: Array<Event> = [];

  constructor(
    public dialogRef: MatDialogRef<DayInsertDialog>,
    @Inject(MAT_DIALOG_DATA) public day: DayData) {
      this.events = day.holidays.concat(day.schedules);
    }

  ok(event): void {
    this.dialogRef.close([this.day, event]);
  }

  cancel(event): void {
    this.dialogRef.close([this.day, event]);
  }

  deleteEvent(i) {
    // this.day.events.splice(i, 1);
  }
}
