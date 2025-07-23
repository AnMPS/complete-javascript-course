'use strict';

const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

function marryPerson(person, newLastName) {}

console.log('Before', jessica);

const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

//Shallow copy
const jessicaCopy = { ...jessica2 };
jessicaCopy.lastName = 'Davis';

console.log(jessica2, jessicaCopy);

//Deep copy

const jessicaClone = structuredClone(jessica2);
jessicaClone.lastName = 'Davis';
jessicaClone.family.push('Mary');

console.log(jessica2, jessicaCopy, jessicaClone);
