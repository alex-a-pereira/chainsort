import { PUSH_TO_FRONT } from './constants';

import logger from '../logger';
import BaseSorter from './base_sorter';

export default class PropertySorter extends BaseSorter {
  /**
   * @param data @type {Array<Object>} @example [{ p1: 1, p2: 'z' }, { p1: 99, p2: 'a' }]
   * @param properites @type {...String} @example 'p1`, 'p2'
   */
  byProperties(data, ...properties)  {
    let propFuncs = properties.map(prop => {
      return (a, b) => {
        let aProp = a[prop];
        let bProp = b[prop];
        return aProp > bProp ? 1 : (aProp < bProp ? -1 : 0);
      };
    });

    // should immediately deal with empty items, then sort by properties
    let allSortFuncs = [this._dealWithEmptyItems.bind(this), ...propFuncs];

    return this._sort(data, allSortFuncs);
  }

  byPropertiesAsync(data, ...properties) {
    logger.warn(`byPropertiesAsync not implemented - ${data} - ${properties}`);
    return data;
  }

  byNestedProperties(data, ...properties) {
    logger.warn(`byNestedProperties not implemented - ${data} - ${properties}`);
    return data;
  }

  byNestedPropertiesAsync(data, ...properties) {
    logger.warn(`byNestedPropertiesAsync not implemented - ${data} - ${properties}`);
    return data;
  }

  // move null/undefined items to the respective back/front of the array
  _dealWithEmptyItems(a, b) {
    let normalizedA = this._normalizeItem(a);
    let normalizedB = this._normalizeItem(b);

    let aNullBNot = normalizedA === this.valueFallback && normalizedB !== this.valueFallback;
    let bNullANot = normalizedA !== this.valueFallback && normalizedB === this.valueFallback;

    switch (true) {
    case aNullBNot && !bNullANot:
      return this.valueFallback === PUSH_TO_FRONT ? 1 : -1;
    case !aNullBNot && bNullANot:
      return this.valueFallback === PUSH_TO_FRONT ? -1 : 1;
    default:
      return 0;
    }
  }

  // non-valid falsy vals should be pushed towards this.nullValuePos side of the array using this.valueFallback
  _normalizeItem(item) {
    return item === 0 ? item : item || this.valueFallback;
  }
}
