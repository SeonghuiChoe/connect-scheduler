const holidays = [{
  "day": "2018-10-03",
  "time": "13",
  "name": "개천절",
  "color": "#dcdcdc",
  "repeat": "true"
}, {
  "day": "2018-10-09",
  "time": "13",
  "name": "한글날",
  "color": "#dcdcdc",
  "repeat": "true"
},{
  "day": "2018-10-20",
  "time": "13",
  "name": "단잡설명회",
  "color": "#b2d8ff",
  "repeat": "false"
}, {
  "day": "2018-10-22",
  "time": "13",
  "name": "여권사진촬영",
  "color": "#b2d8ff",
  "repeat": "false"
}, {
  "day": "2018-10-23",
  "time": "13",
  "name": "필라테스등록",
  "color": "#b2d8ff",
  "repeat": "false"
}, {
  "day": "2018-10-26",
  "time": "13",
  "name": "여권만들기",
  "color": "#b2d8ff",
  "repeat": "false"
}, {
  "day": "2018-10-27",
  "time": "13",
  "name": "은혜님청첩장",
  "color": "#b2d8ff",
  "repeat": "false"
},{
  "day": "2018-10-28",
  "time": "13",
  "name": "통기타",
  "color": "#ffb2dd",
  "repeat": "false"
}, {
  "day": "2018-10-30",
  "time": "13",
  "name": "수영 마지막",
  "color": "#ffb2dd",
  "repeat": "false"
}, {
  "day": "2018-10-31",
  "time": "10",
  "name": "실업인정일",
  "color": "#b2d8ff",
  "repeat": "false"
}, {
  "day": "2018-10-31",
  "time": "15",
  "name": "여권찾기",
  "color": "#ffb2dd",
  "repeat": "false"
}, {
  "day": "2018-10-31",
  "time": "17",
  "name": "영화",
  "color": "#ffb2dd",
  "repeat": "false"
}, {
  "day": "2018-10-31",
  "time": "14",
  "name": "실업급여기업은행",
  "color": "#b2d8ff",
  "repeat": "false"
}, {
  "day": "2018-11-01",
  "time": "13",
  "name": "병원",
  "color": "#b2d8ff",
  "repeat": "false"
}, {
  "day": "2018-11-02",
  "time": "13",
  "name": "필라테스시작",
  "color": "#b2d8ff",
  "repeat": "false"
}, {
  "day": "2018-11-02",
  "time": "13",
  "name": "강민호",
  "color": "#b2d8ff",
  "repeat": "false"
}, {
  "day": "2018-11-03",
  "time": "13",
  "name": "언니랑영화",
  "color": "#b2d8ff",
  "repeat": "false"
}, {
  "day": "2018-11-04",
  "time": "13",
  "name": "통기타",
  "color": "#b2d8ff",
  "repeat": "false"
}, {
  "day": "2018-11-10",
  "time": "13",
  "name": "GDG DevFest seoul 2018",
  "color": "#b2d8ff",
  "repeat": "false"
},{
  "day": "2018-11-13",
  "time": "14",
  "name": "Superb AI 2차 면접",
  "color": "#b2d8ff",
  "repeat": "false"
}, {
  "day": "2019-04-01",
  "time": "13",
  "name": "미국비자발급",
  "color": "#b2d8ff",
  "repeat": "false"
}, {
  "day": "2019-10-01",
  "time": "13",
  "name": "미국일할수있는 날짜",
  "color": "#b2d8ff",
  "repeat": "false"
}];

export class HolidaysService {

  getHolidays() {
    return holidays;
  }
}
