import 'core-js/stable';
import 'regenerator-runtime';
import '@babel/register';

import FunctionSorter from './sorters/function_sorter';
import PropertySorter from './sorters/property_sorter';

const fs = new FunctionSorter();
const ps = new PropertySorter();

module.exports = {
  byFunctions: fs.byFunctions.bind(fs),
  byProperties: ps.byProperties.bind(ps),
  promises: {
    byFunctionsAsync: fs.byFunctionsAsync.bind(fs),
    byPropertiesAsync: ps.byPropertiesAsync.bind(ps)
  }
};
