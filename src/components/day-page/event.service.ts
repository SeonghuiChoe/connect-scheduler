import { Event } from '../../models/Event';
import { Color } from '../../models/Color';

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
          new Color(
            event['_color']._name,
            event['_color']._bgColor,
            event['_color']._textColor,
          ),
          event['_isRepeat'] == 'true',
          event['_detail'],
          event['_isHoliday'],
        ));
  }
}
