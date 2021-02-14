const chainsort = require('../dist');

const people = [
  {
    firstName: 'Alex',
    lastName: 'Pereira',
    car: { year: 2008 }
  },
  {
    firstName: 'Alex',
    lastName: 'Pereira',
    car: { year: 2004 }
  },
  {
    firstName: 'Alex',
    lastName: 'Johnson',
    car: { year: 2020 }
  },
  {
    firstName: 'Noelle',
    lastName: 'Dignan',
    car: { year: 2013 }
  },
  {
    firstName: 'Billy',
    lastName: 'Joel',
    car: { year: 2021 }
  }
];

const sortByLastName = (a, b) => {
  if(a.lastName === b.lastName) return 0;
  return a.lastName > b.lastName ? 1 : -1;
};

// sorted by firstname, then last name, then their car's year in descending order (newer cars first)
console.log(
  chainsort.sort(people, ['firstName', sortByLastName, ['car.year', { order: 'desc' }]])
);
// [
//   { firstName: 'Alex', lastName: 'Johnson', car: { year: 2020 } },
//   { firstName: 'Alex', lastName: 'Pereira', car: { year: 2008 } },
//   { firstName: 'Alex', lastName: 'Pereira', car: { year: 2004 } },
//   { firstName: 'Billy', lastName: 'Joel', car: { year: 2021 } },
//   { firstName: 'Noelle', lastName: 'Dignan', car: { year: 2013 } }
// ]

// sort by last name, then by first name, then by car's year
console.log(
  chainsort.sort(people, ['lastName', 'firstName', 'car.year'])
);
// [
//   { firstName: 'Noelle', lastName: 'Dignan', car: { year: 2013 } },
//   { firstName: 'Billy', lastName: 'Joel', car: { year: 2021 } },
//   { firstName: 'Alex', lastName: 'Johnson', car: { year: 2020 } },
//   { firstName: 'Alex', lastName: 'Pereira', car: { year: 2004 } },
//   { firstName: 'Alex', lastName: 'Pereira', car: { year: 2008 } }
// ]

