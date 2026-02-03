let mode = 0;          
let aiLevel = "easy";
let currentPlayer = "X";
let gameOver = false;

function play() {
  const buttons = document.querySelectorAll(".btn");
  const resetButton = document.getElementById("reset");
  const resultText = document.querySelector(".result"); // FIXED ✔

  // POPUP elements
  const modal = document.getElementById("modal");
  const btn1P = document.getElementById("select1P");
  const btn2P = document.getElementById("select2P");
  const difficultyBox = document.getElementById("difficultyBox");
  const easyBtn = document.getElementById("easyBtn");
  const mediumBtn = document.getElementById("mediumBtn");

  // AUDIO FIX
  const clickSound = new Audio("green.mp3");
  const winSound = new Audio("win.mp3");

  // Show popup on game load
  modal.style.display = "flex";

  // Mode Selection
  btn1P.onclick = () => {
    mode = 1;
    difficultyBox.style.display = "block";
  };

  btn2P.onclick = () => {
    mode = 2;
    modal.style.display = "none";
    resultText.innerText = "Mode: 2 Players";
    resetGame(false);
  };

  // Difficulty selection
  easyBtn.onclick = () => selectDifficulty("easy");
  mediumBtn.onclick = () => selectDifficulty("medium");

  function selectDifficulty(level) {
    aiLevel = level;
    resultText.innerText = level === "easy" ? "Easy Mode" : "Medium Mode";
    modal.style.display = "none";
    resetGame(false);
  }

  // Cell click
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (gameOver || this.innerText !== "") return;

      clickSound.play(); // PLAY CLICK SOUND ✔

      this.innerText = currentPlayer;
      this.disabled = true;

      if (checkWin(currentPlayer, buttons)) {
        resultText.innerText = `${currentPlayer} Wins!`;
        setTimeout(() => {
          winSound.play();// PLAY WIN SOUND 
        }, 600);  
        disableAll(buttons);
        gameOver = true;
        return;
      }

      if (isDraw(buttons)) {
        resultText.innerText = "DRAW!";
        return;
      }

      if (mode === 2) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        return;
      }

      // AI Turn
      currentPlayer = "O";
      setTimeout(() => aiMove(buttons), 300);
    });
  });

  // Reset Button
  resetButton.onclick = () => resetGame(true);

  function resetGame(showPopup) {
    buttons.forEach((b) => {
      b.innerText = "";
      b.disabled = false;
    });
    resultText.innerText = "";
    currentPlayer = "X";
    gameOver = false;
    difficultyBox.style.display = "none";

    if (showPopup) {
      modal.style.display = "flex";
      mode = 0;
    }
  }
}

// ---------------------------------------------------------------------

function aiMove(buttons) {
  if (gameOver) return;

  let empty = [];
  buttons.forEach((b, i) => {
    if (b.innerText === "") empty.push(i);
  });

  let moveIndex;

  if (aiLevel === "easy") {
    moveIndex = empty[Math.floor(Math.random() * empty.length)];
  }

  if (aiLevel === "medium") {
    moveIndex =
      findWinningMove(buttons, "O") ||
      findWinningMove(buttons, "X") ||
      empty[Math.floor(Math.random() * empty.length)];
  }

  buttons[moveIndex].innerText = "O";
  buttons[moveIndex].disabled = true;

  if (checkWin("O", buttons)) {
    document.querySelector(".result").innerText = "AI Wins!";
    disableAll(buttons);
    gameOver = true;
    return;
  }

  currentPlayer = "X";
}

function findWinningMove(buttons, player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const vals = [buttons[a].innerText, buttons[b].innerText, buttons[c].innerText];

    if (vals.filter(v => v === player).length === 2 && vals.includes("")) {
      return pattern[vals.indexOf("")];
    }
  }
  return null;
}

function checkWin(player, buttons) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(pattern =>
    pattern.every(i => buttons[i].innerText === player)
  );
}

function isDraw(buttons) {
  return [...buttons].every(b => b.innerText !== "");
}

function disableAll(buttons) {
  buttons.forEach(b => (b.disabled = true));
}

play();
