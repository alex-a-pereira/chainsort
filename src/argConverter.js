import { getNestedValue } from './utils/typeUtils';

const SORTABLE_TYPES = [
  'boolean',
  'number',
  'string'
];


export default class ArgumentConverter {
  constructor(args) {
    this._args = args;
  }

  get sortingFunctions() {
    return this._args.map(a => {
      return typeof a === 'function' ? a : this._propertyNameToFunction(a);
    });
  }

  // TODO: refactor type inferencing here, too coupled
  _propertyNameToFunction(propName) {
    return (a, b) => {
      let aProp = getNestedValue(a, propName);
      let bProp = getNestedValue(b, propName);

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
  }
}
