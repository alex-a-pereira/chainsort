import { PUSH_TO_BACK, PUSH_TO_FRONT } from './constants';

export default class BaseSorter {
  constructor(opts = {}) {
    this._assignFallbackVlue(opts.nullValuePos);
  }

  _assignFallbackVlue(userSpecifiedPosition) {
    this.nullValuePos = ['front', 'back'].includes(userSpecifiedPosition) ? userSpecifiedPosition : 'back';
    this.valueFallback = this.nullValuePos === 'back' ? PUSH_TO_BACK : PUSH_TO_FRONT;
  }

  _sort(data, ...functions) {
    return data.sort((a, b) => {
      let ret = 0;
      functions.forEach(fn => {
        ret = ret || fn(a, b);
      });
      return ret;
    });
  }

}
