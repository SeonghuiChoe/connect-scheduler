import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DayData {
  date: string;
  holiday: string;
  holidays: Array<Object>;
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

  constructor(
    public dialogRef: MatDialogRef<DayInsertDialog>,
    @Inject(MAT_DIALOG_DATA) public day: DayData) {}

  ok(schedule): void {
    this.dialogRef.close([this.day, schedule]);
  }

  cancel(schedule): void {
    this.dialogRef.close([this.day, schedule]);
  }

  deleteHoliday(i) {
    this.day.holidays.splice(i, 1);
  }
}
