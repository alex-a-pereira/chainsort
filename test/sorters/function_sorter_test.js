import { expect } from 'chai';
import sinon from 'sinon';

import FunctionSorter from '../../src/sorters/function_sorter';

describe('FunctionSorter', () => {
  describe('byFunctions', () => {
    it('should simply call _sort with the supplied arguments', () => {
      let subject = new FunctionSorter;
      sinon.stub(subject, '_sort');
      let expectedArgs = [[3, 2, 1], () => 1, () => -1];
      subject.byFunctions(...expectedArgs);
      sinon.assert.calledWithExactly(subject._sort, ...expectedArgs);
      sinon.restore();
    });

    it('should fall back to subsequent functions after the first returns 0', () => {
      let raw = [
        { firstName: 'Alex', lastName: 'Pereira', age: 22 },
        { firstName: 'Bernie', lastName: 'Sanders', age: 96 },
        { firstName: 'Alex', lastName: 'Pereira', age: 27 },
        { firstName: 'Walter', lastName: 'White', age: 52 },
        { firstName: 'Jesse', lastName: 'Pinkman', age: 24 },
        { firstName: 'Jesse', lastName: 'Stevens', age: 11 },
        { firstName: 'Alex', lastName: 'Johnson', age: 15 }
      ];

      const sortByFirstName = (a, b) => {
        if(a.firstName === b.firstName) return 0;
        return a.firstName > b.firstName ? 1 : -1;
      };

      const sortByLastName = (a, b) => {
        if(a.lastName === b.lastName) return 0;
        return a.lastName > b.lastName ? 1 : -1;
      };

      const sortByAge = (a, b) => {
        if(a.age === b.age) return 0;
        return a.age > b.age ? 1 : -1;
      };

      let subject = new FunctionSorter();
      let result = subject.byFunctions(raw, sortByFirstName, sortByLastName, sortByAge);

      // each item is always sorted by firstName
      // but if firstName is equal, then we sort by lastName
      // if both are equal, then we should sort by age
      let expected = [
        { firstName: 'Alex', lastName: 'Johnson', age: 15 },
        { firstName: 'Alex', lastName: 'Pereira', age: 22 },
        { firstName: 'Alex', lastName: 'Pereira', age: 27 },
        { firstName: 'Bernie', lastName: 'Sanders', age: 96 },
        { firstName: 'Jesse', lastName: 'Pinkman', age: 24 },
        { firstName: 'Jesse', lastName: 'Stevens', age: 11 },
        { firstName: 'Walter', lastName: 'White', age: 52 }
      ];

      expect(result).to.deep.eq(expected);
    });
  });

  // describe('byFunctionsAsync', () => {
  //   it('should return a promise which resolves after the data is sorted', async () => {

  //   });
  // });
});
