export class AddService {
  /**
   * 10미만 앞에 0추가
   */
  zero(target: number) {
    return target < 10 ? '0' + target : target;
  }
}
