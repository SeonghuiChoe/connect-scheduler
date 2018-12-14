import { Schedule } from '../models/schedule';

const holidays = [{
  "date": "2018-10-03",
  "note": "개천절",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "true"
}, {
  "date": "2018-10-09",
  "note": "한글날",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "true"
},{
  "date": "2018-10-20",
  "note": "단잡설명회",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-22",
  "note": "여권사진촬영",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-23",
  "note": "필라테스등록",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-26",
  "note": "여권만들기",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-27",
  "note": "은혜님청첩장",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
},{
  "date": "2018-10-28",
  "note": "통기타",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-30",
  "note": "수영 마지막",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-31",
  "note": "실업인정일",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-31",
  "note": "여권찾기",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-31",
  "note": "영화",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-31",
  "note": "실업급여기업은행",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-11-01",
  "note": "병원",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-11-02",
  "note": "필라테스시작",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-11-02",
  "note": "강민호",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-11-03",
  "note": "언니랑영화",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-11-04",
  "note": "통기타",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-11-10",
  "note": "GDG DevFest seoul 2018",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
},{
  "date": "2018-11-13",
  "note": "Superb AI 2차 면접",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2019-04-01",
  "note": "미국비자발급",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2019-10-01",
  "note": "미국일할수있는 날짜",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-12-15",
  "note": "wedding",
  "color": Schedule.COLORS.DEFALTE,
  "isRepeat": "false"
}];

export class HolidaysService {

  getHolidays() {
    return holidays;
  }
}
