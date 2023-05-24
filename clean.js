'use strict';
// Section 17 Lesson 283: Let's fix some bad code: Part 2

// immutable
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
}); // now immutable.

// we can still edit the inside due to the non-deep freeze
// budget[0].value = 10000;

// arrow function
const getLimit = (limits, user) => limits?.[user] ?? 0;

// Officaly a pure function. Can do all its work without having to look in the scope.
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state; // creates a copy, spreads all the budgets, adds in the new object and returns the array

  // budget.push({ value: -value, description, user: cleanUser });
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  ); // whatever is returned from the callback is why we have a double return:
// return entry.value < -getLimit(limits, entry.user)
// ? { ...entry, flag: 'limit' }
// : entry;

// for (const entry of budget)
//   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// impure function with the console.log
const logBigExpenses = function (state, bigLimit) {
  // let output = '';
  // for (const entry of budget) {
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} /` : '';
  // }

  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join('/');

  // .reduce((str, cur) => `${str} ${cur.description.slice(-2)}`, '');

  console.log(bigExpenses);
};

logBigExpenses(finalBudget, 500);
