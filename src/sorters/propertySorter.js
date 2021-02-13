import BaseSorter from './base_sorter';

export default class PropertySorter extends BaseSorter {
  /**
   * @param data @type {Array<Object>} @example [{ p1: 1, p2: 'z' }, { p1: 99, p2: 'a' }]
   * @param properites @type {...String} @example 'p1`, 'p2'
   */
  byProperties(data, properties = [])  {
    let funcs = properties.map(prop => {
      return (a, b) => {
        let aProp = a[prop];
        let bProp = b[prop];
        return aProp > bProp ? 1 : (aProp < bProp ? -1 : 0);
      };
    });

    return this._sort(data, ...funcs);
  }

  async byPropertiesAsync(data, properties = []) {
    return this.byProperties(data, properties);
  }
}
