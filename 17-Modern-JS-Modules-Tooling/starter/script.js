//Modules vs scripts
//ES6 all variables are private to module, only way to access values is by exporting.
//script mode
//export and import values
//<script type="module”>

// import './shoppingCart.js';
// import { addToCart, tq, totalPrice } from './shoppingCart.js';
// import value from './shoppingCart.js'; //importing default export
import * as shoppingCart from './shoppingCart.js';
import 'core-js/stable';

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

//with parcel

import cloneDep from 'lodash-es';

shoppingCart.addToCart('bread', 5);

console.log(shoppingCart.totalPrice, shoppingCart.tq);

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};

//top level await blocks thread
// const lastPost = await getLastPost();
// console.log(lastPost);

//old module pattern

// const shoppingCart2 = (function () {
//   const cart = [];
//   const shippingCost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quant) {
//     cart.push(product, quant);
//     console.log(`${quant} ${product} added to cart`);
//   };
//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// shoppingCart2.addToCart('apple', 2);

//commonJS

// const { addToCart3 } = require('./shoppingCartCommon.js')

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { logedIn: true },
};

const stateDeepClone = cloneDeep(state);

//parcel, bundling
//npm install parcel --save-dev
//npx parcel

//hot module replacement
//maintains state, does not reload page

if (module.hot) {
  module.hot.accept();
}

//babel
//transpiles new code to old code for old browsers, parcel uses babel automatically

//polifilling async

import 'regenerator-runtime/runtime';
