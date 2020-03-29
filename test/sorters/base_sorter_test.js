import { expect } from 'chai';
import sinon from 'sinon';

import BaseSorter from '../../src/sorters/base_sorter';

// we all know this one!
const basicSort = (a, b) => {
  if(a === b) return 0;
  return a > b ? 1 : -1;
};

describe('BaseSorter', () => {
  describe('_sort', () => {
    it('should take an array and 1 or more functions as arguments', () => {
      let subject = new BaseSorter();
      let mockData = [3, 4, 2, 1];
      expect(subject._sort(mockData, basicSort)).to.deep.eq([1, 2, 3, 4]);
      expect(subject._sort(mockData, basicSort, basicSort)).to.deep.eq([1, 2, 3, 4]);
    });

    it('should apply sorting based on the first function, and only fall back to the second function if the first returns 0', () => {
      let subject = new BaseSorter();
      const stubbedSortingFunction = sinon.stub().returns(1);

      // stub does not get called because basicSort doesnt return 0 when there are no duplicates
      subject._sort([1, 2, 3], basicSort, stubbedSortingFunction);
      expect(stubbedSortingFunction.called).to.eq(false);

      subject._sort([1, 1, 2, 3], basicSort, stubbedSortingFunction);
      expect(stubbedSortingFunction.called).to.eq(true);
    });
  });
});
