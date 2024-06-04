'use strict';

// Selecting Elements

// The Player's All time score
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
// The dice Img element
const diceEl = document.querySelector('.dice');
// The buttons
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
//  The current score holders
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
// Players Boxes
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
// The players Name
const player0Name = document.querySelector('#name--0');
const player1Name = document.querySelector('#name--1');
// To hold the current player
let currentPlayer;
// To hold the current picture to be displayed
let pic;
// To hold the running socre
let currentScore;
let total;

// Resetting the Game

const newGame = function () {
  // To hold the running socre
  currentScore = 0;
  total = 0;

  // Starting Conditions
  score0El.textContent = '0';
  score1El.textContent = '0';
  currentScore0El.textContent = '0';
  currentScore1El.textContent = '0';
  diceEl.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

newGame();

// Score Setter
const scoreSetter = function (value, activePlayer) {
  currentScore += value;
  if (activePlayer.textContent == 'Player 1') {
    currentScore0El.textContent = currentScore;
  } else {
    currentScore1El.textContent = currentScore;
  }
};

// Active player checker
const activePlayer = function () {
  if (player0.classList.contains('player--active')) return player0Name;
  else return player1Name;
};

// Player Changer
const changePlayer = function () {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Dice Pic Changer along with score setter

const picChanger = function (pic, diceNumber) {
  diceEl.src = pic;
  currentPlayer = activePlayer();
  if (diceNumber === 1) {
    currentScore = 0;
    if (currentPlayer.textContent === 'Player 1') {
      currentScore0El.textContent = '0';
    } else {
      currentScore1El.textContent = '0';
    }
    changePlayer();
  } else scoreSetter(diceNumber, currentPlayer);
};

// Rolling The Dice
btnRoll.addEventListener('click', function () {
  if (total < 100) {
    // Generate a random dice roll
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    // Display dice roll
    diceEl.classList.remove('hidden');
    // diceEl.src = `./dice-${diceNumber}.png`
    switch (diceNumber) {
      case 1:
        pic = './dice-1.png';
        break;
      case 2:
        pic = './dice-2.png';
        break;
      case 3:
        pic = './dice-3.png';
        break;
      case 4:
        pic = './dice-4.png';
        break;
      case 5:
        pic = './dice-5.png';
        break;
      case 6:
        pic = './dice-6.png';
        break;
    }
    picChanger(pic, diceNumber);
  }
});

// Clicking Hold

btnHold.addEventListener('click', function () {
  if (total < 100) {
    currentPlayer = activePlayer();
    if (currentPlayer.textContent === 'Player 1') {
      total = Number(score0El.textContent) + currentScore;
      score0El.textContent = total;
      if (total >= 100) {
        player0.classList.toggle('player--winner');
      }
    } else {
      total = Number(score1El.textContent) + currentScore;
      score1El.textContent = total;
      if (total >= 100) {
        player1.classList.toggle('player--winner');
      }
    }
    currentScore = 0;
    changePlayer();
  }
});

btnNew.addEventListener('click', newGame);
