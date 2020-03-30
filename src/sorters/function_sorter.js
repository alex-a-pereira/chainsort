import BaseSorter from './base_sorter';

export default class FunctionSorter extends BaseSorter {
  /**
   * @param data @type {Array<Object>} @example [{ p1: 1, p2: 'z' }, { p1: 99, p2: 'a' }]
   * @param functions @type {...Function} @example (a, b) => return 1, (a, b) => return -1
   *    functions MUST be implemented to accept two items as arguments and return a number..
   */
  byFunctions(data, ...functions)  {
    return this._sort(data, ...functions);
  }

  async byFunctionsAsync(data, ...functions) {
    return this._sort(data, ...functions);
  }
}
