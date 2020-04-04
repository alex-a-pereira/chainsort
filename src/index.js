import 'core-js/stable';
import 'regenerator-runtime';
import '@babel/register';

import FunctionSorter from './sorters/function_sorter';

module.exports = new FunctionSorter();
