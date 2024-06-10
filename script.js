'use strict';

// Selecting Elements

// The Player's All time score element
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
// Th plyers all time scores
const scores = [0, 0];
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
// To hold the current player
let currentPlayer;
// To hold the running socre
let currentScore;
// To hold the active player
let activePlayer;

// Resetting the Game

const newGame = function () {
  currentScore = 0;
  activePlayer = 0;

  // Starting Conditions
  score0El.textContent = currentScore;
  score1El.textContent = currentScore;
  currentScore0El.textContent = currentScore;
  currentScore1El.textContent = currentScore;
  diceEl.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

newGame();

// Player Changer
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// Rolling The Dice
btnRoll.addEventListener('click', function () {
  if (scores[activePlayer] < 100) {
    // Generate a random dice roll
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    // Display dice roll
    diceEl.classList.remove('hidden');

    diceEl.src = `dice-${diceNumber}.png`;

    if (diceNumber === 1) {
      switchPlayer();
    } else {
      // Add the rolled number to the current score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

// Clicking Hold

btnHold.addEventListener('click', function () {
  if (scores[activePlayer] < 100) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] < 100) {
      switchPlayer();
    } else {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    }
  }
});

btnNew.addEventListener('click', newGame);
