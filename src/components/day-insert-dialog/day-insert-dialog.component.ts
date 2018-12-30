import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DayData {
  date: string;
  events: Array<Object>;
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
    note: 'Event',
    detail: '',
  }

  constructor(
    public dialogRef: MatDialogRef<DayInsertDialog>,
    @Inject(MAT_DIALOG_DATA) public day: DayData) {}

  ok(event): void {
    this.dialogRef.close([this.day, event]);
  }

  cancel(event): void {
    this.dialogRef.close([this.day, event]);
  }

  deleteEvent(i) {
    this.day.events.splice(i, 1);
  }
}
