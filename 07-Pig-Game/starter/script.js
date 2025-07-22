'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let turn = 0;
let playing = true;
function negTurn() {
  turn = turn === 0 ? 1 : 0;
}

const currentEls = [current0El, current1El];
const scoreEls = [score0El, score1El];
const playerEls = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];

btnRoll.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  if (dice !== 1) {
    currentScore += dice;
    currentEls[turn].textContent = currentScore;
  } else {
    currentScore = 0;
    currentEls[turn].textContent = 0;
    negTurn();
    for (let a of playerEls) {
      a.classList.toggle('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  scores[turn] += currentScore;
  if (scores[turn] < 20) {
    currentScore = 0;
    scoreEls[turn].textContent = scores[turn];
    currentEls[turn].textContent = 0;
    negTurn();
    diceEl.classList.add('hidden');
  } else {
    playing = false;
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
    scoreEls[turn].textContent = scores[turn];
    currentEls[turn].textContent = 0;
    currentScore = 0;
    playerEls[turn].classList.remove('.player--active');
    playerEls[turn].classList.add('player--winner');
  }
});

btnNew.addEventListener('click', function () {
  scores = [0, 0];
  for (let a of currentEls) {
    a.textContent = 0;
  }
  for (let a of scoreEls) {
    a.textContent = 0;
  }
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  playerEls[0].classList.add('player--active');
  playerEls[1].classList.remove('player--active');
  for (let a of playerEls) {
    a.classList.remove('player--winner');
  }
  turn = 0;
  diceEl.classList.add('hidden');
});
