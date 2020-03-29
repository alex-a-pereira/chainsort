import { expect } from 'chai';

import BaseSorter from '../../src/sorters/base_sorter';

describe('BaseSorter', () => {
  describe('_sort', () => {
    it('should take an array and 1 or more functions as arguments', () => {
      let subject = new BaseSorter();
      let mockData = [4, 3, 2, 1];
      let basicSort = (a, b) => {
        if(a === b) return 0;
        return a > b ? 1 : -1;
      };

      expect(subject._sort(mockData, basicSort)).to.deep.eq([1, 2, 3, 4]);
      expect(subject._sort(mockData, basicSort, basicSort)).to.deep.eq([1, 2, 3, 4]);
    });
  });
});
