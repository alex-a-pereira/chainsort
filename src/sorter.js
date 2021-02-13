import ArgumentConverter from './argConverter';

export default new class ChainSorter {
  sort(items, funcsOrProperties) {
    const funcs = new ArgumentConverter(funcsOrProperties).sortingFunctions;
    return this._chainedSort(items, funcs);
  }

  async sortAsync(...args) {
    return this.sort(...args);
  }

  _chainedSort(items, functions) {
    return items.sort((a, b) => {
      let ret = 0;
      functions.forEach(fn => {
        ret = ret || fn(a, b);
      });
      return ret;
    });
  }
};
