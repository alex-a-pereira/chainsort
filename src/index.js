import 'core-js/stable';
import 'regenerator-runtime';
import '@babel/register';

import chainSorter from './sorter';

module.exports = {
  sort: chainSorter.sort.bind(chainSorter),
  sortAsync: chainSorter.sortAsync.bind(chainSorter)
};
