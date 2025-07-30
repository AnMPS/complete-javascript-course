'use strict';

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, fn) {
  console.log(fn(str));
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is cool!', upperFirstWord);

transformer('JavaScript is cool!', oneWord);

//funcs that return funcs

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}!`);
  };
};

const greeterHey = greet('Hey');
greeterHey('kat');

greet('Hello')('Stella');

const greetA = greeting => name => {
  console.log(`${greeting} ${name}`);
};

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}, name` });
  },
};

lufthansa.book(235, 'Stella M');
const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
  // book: function(){}
};

const book = lufthansa.book;
// does not work
// book(23, 'Sarah W');

book.call(eurowings, 23, 'Sarah W');

//bind does not call the function, instead it returns a function with the this object bound
const bookEW = book.bind(eurowings);
bookEW(23, 'Camille E');
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Nina M');

lufthansa.planes = 300;

lufthansa.buyPlane = function () {
  this.planes++;
  console.log(this.planes);
};

// does not work, this keyword would be the button itself
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPLane);

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//PARTIAL APPLICATION

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.19);
console.log(addVAT(200));

const createVATFunc = function (rate) {
  return addTax.bind(null, rate);
};

console.log(createVATFunc(0.2)(200));

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswser: function () {
    this.answers[prompt(`${this.question}\n${this.options}`)]++;
    this.displayResults();
  },
  displayResults: function () {
    console.log(...this.answers);
  },
};

const regAnsPoll = poll.registerNewAnswser.bind(poll);

document.querySelector('.poll').addEventListener('click', regAnsPoll);

//immedately invoked function expression
(function () {
  console.log('this will never run again');
})();

(() => console.log('this will also never run again'))();

const secureBooking = function () {
  let passengerCount = 0;
  //this is reachable by a closure on booker, will stay on the heap forever

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

//timer
setTimeout(function () {}, 1000);
