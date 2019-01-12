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
    isRepeat: false,
  }

  private events: Array<Event> = [];

  constructor(
    public dialogRef: MatDialogRef<DayInsertDialog>,
    @Inject(MAT_DIALOG_DATA) public day: DayData) {
      this.events = day.holidays.concat(day.schedules);
    }

  ok(schdule): void {
    this.dialogRef.close([this.day, schdule]);
  }

  cancel(schdule): void {
    this.dialogRef.close([this.day, schdule]);
  }

  deleteEvent(i) {
    this.day.schedules.splice(i, 1);
  }
}
