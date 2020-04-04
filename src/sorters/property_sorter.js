// import logger from '../logger';
// import BaseSorter from './base_sorter';

// export default new class PropertySorter extends BaseSorter {
//   /**
//    * @param data @type {Array<Object>} @example [{ p1: 1, p2: 'z' }, { p1: 99, p2: 'a' }]
//    * @param properites @type {...String} @example 'p1`, 'p2'
//    */
//   byProperties(data, ...properties)  {
//     let funcs = properties.map(prop => {
//       return (a, b) => {
//         let aProp = a[prop];
//         let bProp = b[prop];
//         return aProp > bProp ? 1 : (aProp < bProp ? -1 : 0);
//       };
//     });

//     return this.sort(data, funcs);
//   }

//   byPropertiesAsync(data, ...properties) {
//     logger.warn(`byPropertiesAsync not implemented - ${data} - ${properties}`);
//     return data;
//   }

//   byNestedProperties(data, ...properties) {
//     logger.warn(`byNestedProperties not implemented - ${data} - ${properties}`);
//     return data;
//   }

//   byNestedPropertiesAsync(data, ...properties) {
//     logger.warn(`byNestedPropertiesAsync not implemented - ${data} - ${properties}`);
//     return data;
//   }
// };
