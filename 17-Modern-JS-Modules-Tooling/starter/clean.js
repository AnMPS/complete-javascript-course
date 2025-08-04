const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const getLimit = user => spendinglimits?.[user] ?? 0;
const spendinglimits = {
  jonas: 1500,
  matilda: 100,
};

const addExpense = function (value, description, user = 'jonas') {
  user = user.toLowerCase();

  // const lim = spendinglimits[user] ? spendinglimits[user] : 0;
  // const lim = spendinglimits?.[user] ?? 0;
  const lim = getLimit(user);
  if (value <= lim) {
    budget.push({ value: -value, description, user });
  }
};
addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');
console.log(budget);

const checkExpenses = function () {
  for (const entry of budget) {
    // const lim = spendinglimits?.[entry.user] ?? 0;
    const lim = getLimit(entry.user);
    if (entry.value < -lim) {
      entry.flag = 'limit';
    }
  }
};
checkExpenses();

console.log(budget);

const bigExpenses = function (limit) {
  const output = '';
  for (const el of budget) {
    if (el.value <= -limit) {
      output += el.description.slice(-2) + ' / '; // Emojis are 2 chars
    }
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};

//immutability, won’t allow new elements into object but will allow modifying internal stuff
Object.freeze(new Object());
