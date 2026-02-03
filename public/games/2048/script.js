document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const overlay = document.getElementById("overlay");
  const endMessage = document.getElementById("end-message");
  const retryBtn = document.getElementById("retry");

  const width = 4;
  let squares = [];
  let score = 0;

  /* -------------------------
        BOARD CREATION
  ------------------------- */
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
    addColours();
  }
  createBoard();

  /* -------------------------
        GENERATE RANDOM TILE
  ------------------------- */
  function generate() {
    let randomIndex = Math.floor(Math.random() * squares.length);
    if (squares[randomIndex].innerHTML == 0) {
      squares[randomIndex].innerHTML = 2;
      checkForGameOver();
    } else {
      generate();
    }
  }

  /* -------------------------
        MOVEMENT FUNCTIONS
  ------------------------- */
  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let row = [
          parseInt(squares[i].innerHTML),
          parseInt(squares[i + 1].innerHTML),
          parseInt(squares[i + 2].innerHTML),
          parseInt(squares[i + 3].innerHTML),
        ];

        let filteredRow = row.filter(num => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let row = [
          parseInt(squares[i].innerHTML),
          parseInt(squares[i + 1].innerHTML),
          parseInt(squares[i + 2].innerHTML),
          parseInt(squares[i + 3].innerHTML),
        ];

        let filteredRow = row.filter(num => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let column = [
        parseInt(squares[i].innerHTML),
        parseInt(squares[i + width].innerHTML),
        parseInt(squares[i + width * 2].innerHTML),
        parseInt(squares[i + width * 3].innerHTML),
      ];

      let filteredCol = column.filter(num => num);
      let missing = 4 - filteredCol.length;
      let zeros = Array(missing).fill(0);
      let newCol = filteredCol.concat(zeros);

      squares[i].innerHTML = newCol[0];
      squares[i + width].innerHTML = newCol[1];
      squares[i + width * 2].innerHTML = newCol[2];
      squares[i + width * 3].innerHTML = newCol[3];
    }
  }

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let column = [
        parseInt(squares[i].innerHTML),
        parseInt(squares[i + width].innerHTML),
        parseInt(squares[i + width * 2].innerHTML),
        parseInt(squares[i + width * 3].innerHTML),
      ];

      let filteredCol = column.filter(num => num);
      let missing = 4 - filteredCol.length;
      let zeros = Array(missing).fill(0);
      let newCol = zeros.concat(filteredCol);

      squares[i].innerHTML = newCol[0];
      squares[i + width].innerHTML = newCol[1];
      squares[i + width * 2].innerHTML = newCol[2];
      squares[i + width * 3].innerHTML = newCol[3];
    }
  }

  /* -------------------------
        COMBINING FUNCTIONS
  ------------------------- */
  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let sum = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = sum;
        squares[i + 1].innerHTML = 0;
        score += sum;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let sum = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = sum;
        squares[i + width].innerHTML = 0;
        score += sum;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  /* -------------------------
        KEYBOARD CONTROLS
  ------------------------- */
  function control(e) {
    if (e.keyCode === 37) keyLeft();
    else if (e.keyCode === 38) keyUp();
    else if (e.keyCode === 39) keyRight();
    else if (e.keyCode === 40) keyDown();
  }
  document.addEventListener("keyup", control);

  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generate();
    addColours();
  }

  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generate();
    addColours();
  }

  function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generate();
    addColours();
  }

  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generate();
    addColours();
  }

  /* -------------------------
        WIN / GAME OVER
  ------------------------- */
  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        endMessage.innerHTML = "🎉 You WIN!";
        overlay.classList.remove("hidden");
        document.removeEventListener("keyup", control);
      }
    }
  }

  function checkForGameOver() {
    let zeros = squares.filter(sq => sq.innerHTML == 0).length;
    if (zeros === 0) {
      endMessage.innerHTML = "💀 You LOSE!";
      overlay.classList.remove("hidden");
      document.removeEventListener("keyup", control);
    }
  }

  /* -------------------------
        TILE COLORS
  ------------------------- */
  function addColours() {
    for (let i = 0; i < squares.length; i++) {
      const val = parseInt(squares[i].innerHTML);

      const colors = {
        0: "#afa192",
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#ffcea4",
        32: "#e8c064",
        64: "#ffab6e",
        128: "#fd9982",
        256: "#ead79c",
        512: "#76daff",
        1024: "#beeaa5",
        2048: "#d7d4f0",
      };

      squares[i].style.backgroundColor = colors[val] || "#d7d4f0";
    }
  }

  /* -------------------------
        RETRY BUTTON
  ------------------------- */
  retryBtn.addEventListener("click", () => {
    score = 0;
    scoreDisplay.innerHTML = 0;

    squares.forEach(square => (square.innerHTML = 0));

    generate();
    generate();
    addColours();

    overlay.classList.add("hidden");
    document.addEventListener("keyup", control);
  });

  /* -------------------------
        MOBILE SWIPE SUPPORT
  ------------------------- */
  let startX, startY, endX, endY;

  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }

  function handleTouchMove(e) {
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;
  }

  function handleTouchEnd() {
    const diffX = endX - startX;
    const diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 30) keyRight();
      else if (diffX < -30) keyLeft();
    } else {
      if (diffY > 30) keyDown();
      else if (diffY < -30) keyUp();
    }
  }

 document.addEventListener("touchstart", e => {
  e.preventDefault();      // stop pull-to-refresh
  handleTouchStart(e);
}, { passive: false });

document.addEventListener("touchmove", e => {
  e.preventDefault();      // stop page sliding
  handleTouchMove(e);
}, { passive: false });

document.addEventListener("touchend", e => {
  e.preventDefault();
  handleTouchEnd(e);
}, { passive: false });
});
