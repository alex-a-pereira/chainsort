# chainsort

Sort arrays of javascript objects in ways that make sense.

## Why is chainsort needed?
Chainsort provides a simple way to sort objects in complex ways.

Data return from APIs is often complex, and displaying this data to users in a consistent, organized way calls for sorting. Objects returned can't always be sorted by one single property - sometimes they must be sorted by conditionA, then by conditionB, etc.

---

## Features

### Chained sorting algorithms
Adds the ability to sort the same array of objects by multiple conditions. Conditions earlier in the array have higher priority. Conditions later in the array are only called if the earlier criteria matched exactly.

```js
import chainsort from 'chainsort'

const todos = [
  { userId: 2, id: 1, title: 'todo number 1', completed: true },
  { userId: 1, id: 2, title: 'todo number 2', completed: false },
  { userId: 1, id: 3, title: 'todo number 3', completed: true },
  { userId: 2, id: 4, title: 'todo number 4', completed: false },
  { userId: 2, id: 5, title: 'atodo', completed: true }
];

// sort so completed todos are at the front, and then ordered by title
chainsort.sort(todos, ['completed', 'title']);
// [
//   { userId: 2, id: 5, title: 'atodo', completed: true }
//   { userId: 2, id: 1, title: 'todo number 1', completed: true },
//   { userId: 1, id: 3, title: 'todo number 3', completed: true },
//   { userId: 1, id: 2, title: 'todo number 2', completed: false },
//   { userId: 2, id: 4, title: 'todo number 4', completed: false },
// ];

// sort so each user's todos are grouped, then by if completed, then by title
chainsort.sort(todos, ['userId', 'completed', 'title']);
// [
//   { userId: 1, id: 3, title: 'todo number 3', completed: true },
//   { userId: 1, id: 2, title: 'todo number 2', completed: false },
//   { userId: 2, id: 5, title: 'atodo', completed: true }
//   { userId: 2, id: 1, title: 'todo number 1', completed: true },
//   { userId: 2, id: 4, title: 'todo number 4', completed: false },
// ];
```

### Custom sorting functions
Does a naive `a > b` algorithm not work for your data? chainsort accepts callback functions to be passed at any point in the array of sorting conditions.

```js
const sortByCreatedAt = (a, b) => {
  const dA = new Date(a.created_at).getTime();
  const dB = new Date(b.created_at).getTime();
  return dA - dB;
};
// sort first by item's name, and then by the created_at timestamp
chainsort(items, ['name', sortByCreatedAt]);
```

### Sorting based on conditions of nested objects
Data returned from a server often contains nested objects. chainsort accounts for this and allows you to specify a nested keys to sort by.

```js
const users = [
  { id: 12, name: 'alex', account: { id: 7, isActive: true } },
  { id: 15, name: 'bill', account: { id: 9, isActive: false } }
]

// sort by the user's account's isActive status
chainsort(users, ['name', 'account.isActive']);
```

---

## chainsort API
**chainsort.sort(items, conditions)**

`items` is an array of objects to be sorted

`conditions` is an array of either:
- strings to access properties in objects (keys of a property in every)
    - `'id'`
- strings to access propertiest in nested objects
    - `'account.id'`
- [callback functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

**chainsort.sortAsync(items, conditions)**

Accepts the same arguments as `.sort()`, but returns a Promise which resolves with the sorted data.

---

## Development

Chainsort is still under development and I'd love some help if you'd like to contribute!

### Future Features
- [] allow users to specificy whether null values should go forwards or backwards
- [] allow users to reverse the sorting of a particular sort conditiong
