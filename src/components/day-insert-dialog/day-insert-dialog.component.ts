import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Event } from '../../models/Event';
import { Color } from '../../models/Color';

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

  private schedule = {
    note: '',
    detail: '',
    color: new Color(),
    isRepeat: false,
  }

  private events: Array<Event> = [];

  private colors: Array<Color> = [
    new Color('r', '#e1786e', '#fff'),
    new Color('b', '#98a2d8', '#fff'),
    new Color('g', '#a9d6a5', '#fff'),
  ];

  constructor(
    public dialogRef: MatDialogRef<DayInsertDialog>,
    @Inject(MAT_DIALOG_DATA) public day: DayData) {
      this.events = day.holidays.concat(day.schedules);
    }

  changeColor(color) {
    this.schedule.color = color;
  }

  ok(schdule): void {
    this.dialogRef.close([this.day, schdule]);
  }

  cancel(schdule): void {
    this.dialogRef.close([this.day, schdule]);
  }

  deleteEvent(i: number) {
    // for view
    this.events.splice(i, 1);
    // for schedule
    this.day.schedules.splice(i, 1);
  }
}
