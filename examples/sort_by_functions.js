const chainsort = require('./dist');

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

chainsort.byFunctions(raw, sortByFirstName, sortByLastName, sortByAge);
// objects will be sorted by firstname, then by lastname, then by age
// [
//   { firstName: 'Alex', lastName: 'Johnson', age: 15 },
//   { firstName: 'Alex', lastName: 'Pereira', age: 22 },
//   { firstName: 'Alex', lastName: 'Pereira', age: 27 },
//   { firstName: 'Bernie', lastName: 'Sanders', age: 96 },
//   { firstName: 'Jesse', lastName: 'Pinkman', age: 24 },
//   { firstName: 'Jesse', lastName: 'Stevens', age: 11 },
//   { firstName: 'Walter', lastName: 'White', age: 52 }
// ];
