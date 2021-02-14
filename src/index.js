import chainSorter from './sorter';

module.exports = {
  sort: chainSorter.sort.bind(chainSorter),
  sortAsync: chainSorter.sortAsync.bind(chainSorter)
};
