// Get DOM elements
const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image"),
  resetBtn = document.getElementById("resetBtn");

// Score variables
let userScore = 0;
let cpuScore = 0;

// Score display elements
const userScoreEl = document.getElementById("userScore");
const cpuScoreEl = document.getElementById("cpuScore");

// Reset game function
function resetGame() {
  userScore = 0;
  cpuScore = 0;
  userScoreEl.textContent = 0;
  cpuScoreEl.textContent = 0;

  userResult.src = "images/rock.png";
  cpuResult.src = "images/rock.png";
  result.textContent = "Let's Play!!";

  optionImages.forEach((img) => img.classList.remove("active"));
}

// Reset button event
resetBtn.addEventListener("click", resetGame);

// Game logic
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    userResult.src = cpuResult.src = "images/rock.png";
    result.textContent = "Wait...";

    optionImages.forEach((image2, index2) => {
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    setTimeout(() => {
      gameContainer.classList.remove("start");

      userResult.src = e.target.querySelector("img").src;

      let randomNumber = Math.floor(Math.random() * 3);
      let cpuImages = [
        "images/rock.png",
        "images/paper.png",
        "images/scissors.png",
      ];
      cpuResult.src = cpuImages[randomNumber];

      let cpuValue = ["R", "P", "S"][randomNumber];
      let userValue = ["R", "P", "S"][index];

      let outcomes = {
        RR: "Draw",
        RP: "Cpu",
        RS: "User",
        PP: "Draw",
        PR: "User",
        PS: "Cpu",
        SS: "Draw",
        SR: "Cpu",
        SP: "User",
      };

      let outComeValue = outcomes[userValue + cpuValue];

      if (outComeValue === "Draw") {
        result.textContent = "Match Draw";
      } else if (outComeValue === "User") {
        userScore++;
        userScoreEl.textContent = userScore;
        result.textContent = "You Won!!";
      } else {
        cpuScore++;
        cpuScoreEl.textContent = cpuScore;
        result.textContent = "CPU Won!!";
      }
    }, 2000);
  });
});
