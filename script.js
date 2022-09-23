"use strict";

//Elements selection
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const buttonNew = document.querySelector(".btn--new");
const buttonRoll = document.querySelector(".btn--roll");
const buttonHold = document.querySelector(".btn--hold");

//Element manipulation
let scores, currentScore, activePlayer, playing;
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.innerText = 0;
  score1El.innerText = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();
const switchPlayers = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

//Rolling dice functionality

buttonRoll.addEventListener("click", () => {
  if (playing) {
    // 1-Generate a random dice roll

    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2-Displays the dice roll

    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //3- Check if it is 1 or not ?
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
});

buttonHold.addEventListener("click", () => {
  if (playing) {
    // Add current score to the player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      switchPlayers();
    }

    // Check if it less than 100
  }
});

buttonNew.addEventListener("click", init);
