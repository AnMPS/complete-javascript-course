'use strict';

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'Correct Number';

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 20;

// document.querySelector('.guess').value;

let number = Math.trunc(Math.random() * 20) + 1;
let score = 20;
const disMessage = function (msg) {
  document.querySelector('.message').textContent = msg;
};
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  function lowerSandUpd() {
    score--;
    document.querySelector('.score').textContent = score;
  }

  if (!guess) {
    if (score > 1) {
      disMessage('No number!');
      lowerSandUpd();
    } else disMessage('You lost');
  } else if (guess > number) {
    if (score > 1) {
      disMessage('Too high!');
      lowerSandUpd();
    } else disMessage('You lost');
  } else if (guess < number) {
    if (score > 1) {
      disMessage('Too low!');
      lowerSandUpd();
    } else disMessage('You lost');
  } else if (guess == number) {
    disMessage('Correct number!');
    document.querySelector('.number').textContent = number;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (Number(document.querySelector('.highscore').textContent) < score) {
      document.querySelector('.highscore').textContent = score;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  disMessage('Start guessing...');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  score = 20;
  document.querySelector('.score').textContent = score;
  number = Math.trunc(Math.random() * 20) + 1;
});
