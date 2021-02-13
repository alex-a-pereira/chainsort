export default class BaseSorter {
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
