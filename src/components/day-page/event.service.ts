import { Event } from '../../models/Event';

export class MakeEventObject {

  /**
   * Make event Object
   * @param arr
   * @return {Array<Event>}
   */
  perform(arr: Array<Object>) {
    return arr
      .map((event: Object) =>
        new Event(
          new Date(event['_date']),
          event['_note'],
          event['_color'],
          event['_isRepeat'] == 'true',
          event['_detail'],
          event['_isHoliday'],
        ));
  }
}
