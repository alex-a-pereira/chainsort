import { getNestedValue } from './utils/typeUtils';

const SORTABLE_TYPES = [
  'boolean',
  'number',
  'string'
];

export const ASCENDING = 'asc';
export const DESCENDING = 'desc';

export default class ArgumentConverter {
  constructor(args) {
    this._args = args;
  }

  get sortingFunctions() {
    return this._args.map(a => {
      switch (typeof a) {
        case 'function':
          return a;
        case 'object':
          return Array.isArray(a) ? this._propNameWithOptionsToFunction(a) : this._propertyNameToFunction(a);
        default:
          return this._propertyNameToFunction(a);
      }
    });
  }

  _propNameWithOptionsToFunction(propNameWithOpts) {
    const [propName, options] = propNameWithOpts;
    return this._propertyNameToFunction(propName, options);
  }

  // TODO: refactor type inferencing here, too coupled
  _propertyNameToFunction(propName, options = {}) {
    const {
      order = ASCENDING
    } = options;

    // if order is descending, we should perform reverse sort logic
    const gtDirection = order === ASCENDING ? 1 : -1;
    const ltDirection = order === ASCENDING ? -1 : 1;

    return (a, b) => {
      let aProp = getNestedValue(a, propName);
      let bProp = getNestedValue(b, propName);

      const tA = typeof aProp;
      const tB = typeof bProp;

      const isNullA = aProp === null || tA === 'undefined' || (tA === 'number' && isNaN(aProp));
      const isNullB = bProp === null || tB === 'undefined' || (tB === 'number' && isNaN(bProp));

      // null conditions need to go to back
      if(isNullA !== isNullB) {
        return isNullA && !isNullB ? gtDirection : (isNullB && !isNullA ? ltDirection : 0);
      }

      const types = SORTABLE_TYPES.find(i => i === tA && i === tB);

      // type mismatch or unsortable types need to go back
      if(!types) { return gtDirection; }

      // bools need to be inverse to push false to the back
      if(types === 'boolean') {
        return aProp < bProp ? gtDirection : (aProp > bProp ? ltDirection : 0);
      }
      return aProp > bProp ? gtDirection : (aProp < bProp ? ltDirection : 0);
    };
  }
}
