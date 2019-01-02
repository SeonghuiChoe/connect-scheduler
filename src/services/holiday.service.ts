import { Holiday } from '../models/holiday';

const holidays = [{
  "date": "2018-10-03",
  "note": "개천절",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "true"
}, {
  "date": "2018-10-09",
  "note": "한글날",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "true"
},{
  "date": "2018-10-20",
  "note": "단잡설명회",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-22",
  "note": "여권사진촬영",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-23",
  "note": "필라테스등록",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-26",
  "note": "여권만들기",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-27",
  "note": "은혜님청첩장",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
},{
  "date": "2018-10-28",
  "note": "통기타",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-30",
  "note": "수영 마지막",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-31",
  "note": "실업인정일",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-31",
  "note": "여권찾기",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-31",
  "note": "영화",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-10-31",
  "note": "실업급여기업은행",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-11-01",
  "note": "병원",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-11-02",
  "note": "필라테스시작",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-11-02",
  "note": "강민호",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-11-03",
  "note": "언니랑영화",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-11-04",
  "note": "통기타",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-11-10",
  "note": "GDG DevFest seoul 2018",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
},{
  "date": "2018-11-13",
  "note": "Superb AI 2차 면접",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2019-04-01",
  "note": "미국비자발급",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2019-10-01",
  "note": "미국일할수있는 날짜",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-12-10",
  "note": "첫출근",
  "detail": "뉴럴비씨 첫출근",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-12-15",
  "note": "결혼식",
  "detail": "은혜님 결혼식",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "false"
}, {
  "date": "2018-01-02",
  "note": "신정",
  "detail": "",
  "color": Holiday.COLORS.DEFALTE,
  "isRepeat": "true"
}];

export class HolidayService {

  getHolidays() {
    return holidays;
  }
}
