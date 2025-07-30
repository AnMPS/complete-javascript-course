'use strict';

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;

[game.team1.gk, ...game.team1.fieldPlayers] = players1;

const allPLayers = [...players1, ...players2];

game.team1.playersFinal = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

const { team1: team1odds, x: draw, team2: team2odds } = game.odds;

const printGoals = function (...plys) {
  return `${plys.length} goals were scored`;
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

for (let ply in game.scored) {
  console.log(`Goal ${ply}: ${game.scored[ply]}`);
}
let averageOdd = function (...inputs) {
  let x = 0;
  for (let y of inputs) x += y;
  console.log(`${x / 3}`);
};
averageOdd(game.odds);

for (let [key, value] of Object.entries(game.odds)) {
  console.log(`${key} has a ${value} chance of winning`);
}

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);
const events = function (evMap) {
  const ret = new Set();
  for (let i of evMap) {
    ret.add(i[1]);
  }
  return [...ret];
};

gameEvents.delete(64);
console.log(
  `an event happened on average every ${90 / gameEvents.size} minutes`
);

for (let i of gameEvents) {
  i[0] <= 45 && console.log([`FIRST HALF: ${i[1]}`]);
  i[0] > 45 && console.log(`SECOND HALF ${i[1]}`);
}

const plane = 'A320';

//plane[0] A
//plane[1] 3

plane.length; //5

const airline = 'TAP AIR Portugal';

airline.indexOf('r'); // 6, starts from 0
airline.lastIndexOf('r'); //10
airline.slice(4); //AIR Portugal

//Extract first word

const firstWord = airline.slice(0, airline.indexOf(' '));

//Extract last word

const lastWord = airline.slice(airline.lastIndexOf(' ') + 1, airline.length);

console.log(airline.slice(-2));
