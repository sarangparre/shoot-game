const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");
const startBtn = document.querySelector(".start-btn");
const shoot1 = document.querySelector(".shoot-1");
const shoot2 = document.querySelector(".shoot-2");
const health1 = document.querySelector(".health-1");
const health2 = document.querySelector(".health-2");
const p1Win = document.querySelector(".p1-win");
const p2Win = document.querySelector(".p2-win");
const winner1 = document.querySelector(".winner-1");
const winner2 = document.querySelector(".winner-2");
const next = document.querySelector(".next");
const reset = document.querySelector(".reset-btn");

let health = [100, 100];
let wins = [0, 0];

//Start Game Button
startBtn.addEventListener("click", () => {
  shoot1.classList.add("gameon");
  shoot2.classList.add("gameon");
  player1.classList.add("active");
  shoot2.disabled = true;
  healthUpdate(health[0], health[1]);
  p1Win.textContent = "Player 1-Won: 0";
  p2Win.textContent = "Player 2-Won: 0";
  startBtn.classList.add("hide");
  reset.classList.add("show");
});

//New Game Button
reset.addEventListener("click", () => {
  player1.classList.add("active");
  player2.classList.remove("active");
  shoot2.disabled = true;
  shoot1.disabled = false;
  health[0] = 100;
  health[1] = 100;
  healthUpdate(health[0], health[1]);
  winner1.textContent = "";
  winner2.textContent = "";
  wins[0] = 0;
  wins[1] = 0;
  p1Win.textContent = "Player 1-Won: " + wins[0];
  p2Win.textContent = "Player 2-Won: " + wins[1];
  next.classList.remove("next-active");
});

// Winner Deciding Function
const winner = (h1, h2) => {
  if (h1 === 0) {
    shoot1.disabled = true;
    shoot2.disabled = true;
    wins[1] += 1;
    p2Win.textContent = "Player 2-Won: " + wins[1];
    winner2.textContent = "Player 2 won the match...!!!";
    next.classList.add("next-active");
  } else if (h2 === 0) {
    shoot1.disabled = true;
    shoot2.disabled = true;
    wins[0] += 1;
    p1Win.textContent = "Player 1-Won: " + wins[0];
    winner1.textContent = "Player 1 won the match...!!!";
    next.classList.add("next-active");
  }
};

//Next Match Button
next.addEventListener("click", () => {
  if (wins[0] === 3) {
    winner1.textContent = "Player 1 won the tournament...!!!";
    next.classList.remove("next-active");
  } else if (wins[1] === 3) {
    winner2.textContent = "Player 2 won the tournament...!!!";
    next.classList.remove("next-active");
  } else {
    winner1.textContent = "";
    winner2.textContent = "";
    player1.classList.add("active");
    player2.classList.remove("active");
    shoot1.disabled = false;
    shoot2.disabled = true;
    health[0] = 100;
    health[1] = 100;
    health1.textContent = "Health: " + health[0];
    health2.textContent = "Health: " + health[1];
    next.classList.remove("next-active");
  }
});

//Health Update Function
const healthUpdate = (h1, h2) => {
  if (h1 <= 0) {
    health[0] = 0;
    health1.textContent = "Health: " + health[0];
    winner(health[0], health[1]);
  } else if (h2 <= 0) {
    health[1] = 0;
    health2.textContent = "Health: " + health[1];
    winner(health[0], health[1]);
  } else {
    health1.textContent = "Health: " + health[0];
    health2.textContent = "Health: " + health[1];
  }
};

//Players turn Changing Function
const nextPlayer = () => {
  player1.classList.toggle("active");
  player2.classList.toggle("active");
};

//Shoot buttons
shoot1.addEventListener("click", () => {
  let power = Math.floor(Math.random() * 6);
  power *= 10;
  health[1] -= power;
  healthUpdate(health[0], health[1]);
  if (health[1] != 0) {
    nextPlayer();
    shoot1.disabled = true;
    shoot2.disabled = false;
  }
});

shoot2.addEventListener("click", () => {
  let power = Math.floor(Math.random() * 6);
  power *= 10;
  health[0] -= power;
  healthUpdate(health[0], health[1]);
  if (health[0] != 0) {
    nextPlayer();
    shoot1.disabled = false;
    shoot2.disabled = true;
  }
});
