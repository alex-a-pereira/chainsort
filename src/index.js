import 'core-js/stable';
import 'regenerator-runtime';
import '@babel/register';

import FunctionSorter from './sorters/function_sorter';

const fs = new FunctionSorter();

module.exports = {
  byFunctions: fs.byFunctions.bind(fs),
  promises: {
    byFunctionsAsync: fs.byFunctionsAsync.bind(fs)
  }
};
