import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Event } from '../../models/Event';
import { Color } from '../../models/Color';

export interface DayData {
  day: {
    date: string;
    holidays: Array<Event>;
    schedules: Array<Event>;
    isNotCurrentMonthDays: boolean;
    isToday: boolean;
    isWeekend: boolean;
  },
  schedule: {
    note: string,
    detail: string,
    color: Color,
    isRepeat: boolean,
  }
}

@Component({
  selector: 'day-dialog.',
  templateUrl: 'day-dialog.component.html',
  styleUrls: ['./day-dialog.component.scss'],
})
export class DayDialog {

  private schedule = {
    note: '',
    detail: '',
    color: new Color(),
    isRepeat: false,
  }

  private checkDelete: Array<number> = [];

  private events: Array<Event> = [];

  private colors: Array<Color> = [
    new Color('r', '#e1786e', '#fff'),
    new Color('b', '#98a2d8', '#fff'),
    new Color('g', '#a9d6a5', '#fff'),
  ];

  constructor(
    public dialogRef: MatDialogRef<DayDialog>,
    @Inject(MAT_DIALOG_DATA) public dayData: DayData) {
      this.events = dayData.day.holidays
        .concat(dayData.day.schedules);
      if (dayData.schedule) {
        this.schedule.note = dayData.schedule.note;
        this.schedule.detail = dayData.schedule.detail;
        this.schedule.color = dayData.schedule.color;
        this.schedule.isRepeat = dayData.schedule.isRepeat;
      }
    }

  changeColor(color) {
    this.schedule.color = color;
  }

  ok(schdule): void {
    // for schedule
    if (this.checkDelete.length > 0) {
      for (let i = 0; i < this.checkDelete.length; i++) {
        this.dayData.day.schedules.splice(i, 1);
      }
    }
    this.dialogRef.close([this.dayData.day, schdule]);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  deleteEvent(i: number) {
    // for view
    this.events.splice(i, 1);
    this.checkDelete.push(i);
  }
}
