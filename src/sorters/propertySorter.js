import BaseSorter from './base_sorter';

import { getNestedValue } from '../utils/typeUtils';

const SORTABLE_TYPES = [
  'boolean',
  'number',
  'string'
];

export default class PropertySorter extends BaseSorter {
  /**
   * @param data @type {Array<Object>} @example [{ p1: 1, p2: 'z' }, { p1: 99, p2: 'a' }]
   * @param properites @type {...String} @example 'p1`, 'p2'
   */
  byProperties(data, properties = [])  {
    // convert array of props into array of sorting functions
    const funcs = properties.map(prop => {
      return (a, b) => {
        let aProp = getNestedValue(a, prop);
        let bProp = getNestedValue(b, prop);

        const tA = typeof aProp;
        const tB = typeof bProp;

        const isNullA = aProp === null || tA === 'undefined' || (tA === 'number' && isNaN(aProp));
        const isNullB = bProp === null || tB === 'undefined' || (tB === 'number' && isNaN(bProp));

        // null conditions need to go to back
        if(isNullA !== isNullB) {
          return isNullA && !isNullB ? 1 : (isNullB && !isNullA ? -1 : 0);
        }

        const types = SORTABLE_TYPES.find(i => i === tA && i === tB);

        // type mismatch or unsortable types need to go back
        if(!types) { return 1; }

        // bools need to be inverse to push false to the back
        if(types === 'boolean') {
          return aProp < bProp ? 1 : (aProp > bProp ? -1 : 0);
        }
        return aProp > bProp ? 1 : (aProp < bProp ? -1 : 0);
      };
    });

    return this._sort(data, ...funcs);
  }

  async byPropertiesAsync(data, properties = []) {
    return this.byProperties(data, properties);
  }
}
