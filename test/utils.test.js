import { expect } from 'chai';

import { getNestedValue } from '../src/utils/typeUtils';

describe('getNestedValue', () => {
  it('should return the val in root of object if a regular key is passed', () => {
    const obj = { root: 'thing' };
    const result = getNestedValue(obj, 'root');
    expect(result).to.eq(obj.root);
  });

  const objWithNesting = {
    level1:{
      level2: { level2Key: 'level2Val' }
    }
  };

  it('should return a nested value when a string in dot notation is passed', () => {
    const result = getNestedValue(objWithNesting, 'level1.level2.level2Key');
    expect(result).to.eq(objWithNesting.level1.level2.level2Key);
  });

  it('should return undefined if a key doesnt exist at any level', () => {
    expect(
      getNestedValue(objWithNesting, 'nonesense')
    ).to.be.an('undefined');

    expect(
      getNestedValue(objWithNesting, 'level1.nonesense')
    ).to.be.an('undefined');

    expect(
      getNestedValue(objWithNesting, 'level1.level2.nonesense')
    ).to.be.an('undefined');

    expect(
      getNestedValue(objWithNesting, 'level1.level2.nonesense.moreNonesense.noneOfThisExists')
    ).to.be.an('undefined');
  });

  it('should work with Numbers as keys', () => {
    const objWithNumberKeys = {
      1: {
        2: { key2: '2val' }
      }
    };

    expect(
      getNestedValue(objWithNumberKeys, '1.2.key2')
    ).to.eq('2val');
  });
});
