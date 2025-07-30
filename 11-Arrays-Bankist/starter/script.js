'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUNames(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const arr = [23, 11, 64];

// console.log(arr[0]);
// console.log(arr.at(0));

// console.log(arr[arr.length -1]);
// console.log(arr.at(-1)); //returns last item

//FOREACH BREAK AND CONTINUE WON’T WORK
// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`movement ${index}: you deposited ${movement}`);
//   } else console.log(`movement ${index} you withdrew ${movement * -1}`);
// });

//foreach with maps and sets

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

//works the same with sets but there's no key, key is same as value

// const eurToUSD = 1.1;

// const movUSD = movements.map(function (mov, index) {
//   return mov * eurToUSD;
// });
// const movUSDArr = movements.map(mov => mov * eurToUSD);

// console.log(movements);
// console.log(movUSDArr);

//computing usernames

const deposits = movements =>
  movements.filter(function (mov) {
    return mov > 0;
  });

const withdrawals = movements =>
  movements.filter(function (mov) {
    return mov <= 0;
  });

//receives an accumulator
const calcPrintBalance = function (acc) {
  const balance = acc.movements.reduce(function (accum, cur, i, arr) {
    return accum + cur;
  }, 0);
  labelBalance.textContent = `${balance} EUR`;
  acc.balance = balance;
};

const max = movements.reduce((acc, mov) => {
  mov > acc ? mov : acc;
}, 0);

const calcDisplaySummary = function (acc) {
  const incomes = deposits(acc.movements).reduce((tot, mov) => tot + mov, 0);
  labelSumIn.textContent = `${incomes}`;
  const expenses = withdrawals(movements).reduce((tot, mov) => tot + mov, 0);
  labelSumOut.textContent = `${expenses * -1}`;

  const interest = deposits(movements)
    .filter(mov => mov > 0)
    .map(dep => (dep * acc.interestRate) / 100)
    .reduce((tot, int) => tot + int, 0);
  labelSumInterest.textContent = interest;
};

//will return the first element that return true;
movements.find(mov => mov < 0);

const getAccount = owner => accounts.find(acc => acc.owner === owner);

//LOGIN
let currentAcc = undefined;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  const acc = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (acc?.pin === Number(inputLoginPin.value)) {
    console.log('login');
    //weclome
    labelWelcome.textContent = `Weclome back, ${acc.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    currentAcc = acc;
    refreshUi(acc);
  }
});
function refreshUi(acc) {
  displayMovements(acc.movements);
  calcPrintBalance(acc);
  calcDisplaySummary(acc);
}

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const rAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  if (rAcc && currentAcc.balance >= amount && amount > 0) {
    console.log('Transfer valid');
    currentAcc.movements.push(-amount);
    rAcc.movements.push(amount);
    refreshUi(currentAcc);
    inputTransferTo.value = inputTransferAmount.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAcc.username === inputCloseUsername.value &&
    currentAcc.pin === Number(inputClosePin.value)
  ) {
    console.log('account deleted');
    const index = accounts.findIndex(
      acc => acc.username === currentAcc.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
  }
});

//some every

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = inputLoanAmount.value;
  if (anyDeposLoan(currentAcc, amount) && amount > 0) {
    currentAcc.movements.push(Number(amount));
    refreshUi(currentAcc);
  }
});
const anyDeposLoan = (acc, value) =>
  acc.movements.some(mov => mov >= value * 0.1);

//flat and flatmap

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

let flatArr = arr.flat();
//flattens array by one level
flatArr = arr.flat(4);

// const accountMovements = accounts.map (acc => acc.movements);
// const allMovements = accountMovements.flat();
//does the same thing
// const allMovements = accounts.flatMap(acc=> acc.movements);

//sorting only sorts strings ex. 10 1300 200 3000 450 70, unix sort
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];

//sorting with cb, return <0, A, B else B, A;

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAcc.movements, !sorted);
  sorted = !sorted;
});

//array grouping

const groupedMovs = Object.groupBy(movements, mov =>
  mov > 0 ? 'deposits' : 'withdrawals'
);

//nodelist, from ui

const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
