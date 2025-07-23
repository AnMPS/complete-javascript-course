'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`here's your pasta with: ${ing1}, ${ing2}, and ${ing3}`);
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {},
};
let [first, , second] = restaurant.categories;
console.log(first, second);

[first, second] = [second, first];
console.log(first, second);

const [starter, main] = restaurant.order(2, 0);
console.log(starter, main);

//nested destructuring
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

//default values
const [p = 1, q = 1, r = 1] = [8, 9];

console.log(p, q, r);

//deconstruct object
const { name, openingHours, categories } = restaurant;

const { name: restName, openingHours: hours, categories: tags } = restaurant;

//defaults

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// //mutating variables
// let a = 111;
// let b = 222;
// // const obj = { a: 23, b: 7, c: 14 };

// ({ a, b } = obj);

//nested object
const {
  fri: { open, close },
} = openingHours;

//spread operator
const arr = [7, 8, 9];

const badNewArray = [1, 2, arr[0], arr[1], arr[2]];

const newArr = [1, 2, ...arr];

const newMenu = [...restaurant.mainMenu, 'Gnocchi'];

const fullMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];

const ingredients = ['cheese', 'egg', 'bacon'];
console.log(restaurant.orderPasta(...ingredients));
console.log(restaurant.orderPizza('mushrooms', 'olives', 'spinach'));

///REST
const [a, b, ...others] = [1, 2, 3, 4, 5];

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

//grabs pizza and risotto from main menu, then adds starter menu as an array at the end and makes them all new variables.

console.log([pizza, risotto, otherFood]);

const { sat, ...weekdays } = restaurant.openingHours;

console.log(sat, weekdays);

const add = function (...numbers) {
  let sum = 0;
  for (const x of numbers) {
    sum += x;
  }
  return sum;
};

//these are the same code because numGuests does not exist.
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
const guests2 = restaurant.numGuests || 10;

//&& short circuits to falsy value or last value

console.log(0 && 'Jonas'); //returns 0

console.log(7 && 'Jonas'); //returns Jonas

console.log('Hello' && 23 && null && 8); //returns null

//these are the same code
if (restaurant.orderPizza) {
  restaurant.orderPasta('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

const rest1 = {
  name: 'Capri',
  numGuests: 20,
};
const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

//rest1 10, rest2 20
rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 10;

//same as above, 10
rest1.numGuests ||= 10;

//same as above 20
rest2.numGuests ||= 20;

// when 0 use ?? instead
rest1.numGuests ??= 10;

//replace if it exists
rest1.owner &&= 'meme'; //leaves undefined
rest2.owner &&= 'meme'; //assigns to meme
