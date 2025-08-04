console.log('Importing Module');

// import { rand } from './math.js';
// import { showDice } from './dom.js';

// const dice = rand(1, 6, 2);
// showDice(dice);

//blocking code, this will block running importing module too
// console.log('start user fetch');
// const res = await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('finish user fetch');

//all of these are private to the module
const shippingCost = 10;
export const cart = [];

//export

export const addToCart = function (product, quant) {
  cart.push(product, quant);
  console.log(`${quant} ${product} added to cart`);
};

const totalPrice = 22;
const totalQuant = 44;
export { totalPrice, totalQuant as tq };

//default exports

// export default 222;

//top level await, blocks execution of entire module

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();

// console.log(data);
