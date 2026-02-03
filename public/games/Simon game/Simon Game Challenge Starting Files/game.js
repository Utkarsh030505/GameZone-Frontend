let level = 0;
let input = [];
let userinput = [];
let acceptingClicks = false;

// Audio unlocking (mobile fix)
let audioContext;
let audioUnlocked = false;

// High score
let highestlevel = localStorage.getItem("score") || 0;
document.getElementById("score").innerText = highestlevel;

document.querySelector(".newgame").addEventListener("click", () => {
    location.reload();
});

// --------------------------------------------------------------------
// AUDIO ENGINE (Correct for Mobile)
// --------------------------------------------------------------------

function unlockAudio() {
    if (!audioUnlocked) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, 1, 22050);
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);

        audioUnlocked = true;
    }
}

function playSound(file) {
    if (!audioUnlocked) return;
    const a = new Audio(file);
    a.play().catch(() => {});
}

// --------------------------------------------------------------------
// START LISTENERS (fixed - removable)
// --------------------------------------------------------------------

function onKeyStart() {
    unlockAudio();
    removeStartListeners();
    startGame();
}

function onTouchStart(e) {
    e.preventDefault();
    unlockAudio();
    removeStartListeners();
    startGame();
}

function enableStartListeners() {
    document.body.addEventListener("keydown", onKeyStart);
    document.body.addEventListener("touchstart", onTouchStart, { passive: false });
}

function removeStartListeners() {
    document.body.removeEventListener("keydown", onKeyStart);
    document.body.removeEventListener("touchstart", onTouchStart);
}

// --------------------------------------------------------------------
// START GAME
// --------------------------------------------------------------------

function startGame() {
    level = 1;
    input = [];
    userinput = [];
    acceptingClicks = false;

    nextLevel();
}

// --------------------------------------------------------------------
// CPU SEQUENCE
// --------------------------------------------------------------------

function random() {
    return Math.floor(Math.random() * 4);
}

function nextLevel() {
    document.querySelector("h1").innerText = "Level " + level;

    let colors = ["green", "red", "yellow", "blue"];
    let color = colors[random()];

    input.push(color);

    let btn = document.getElementById(color);
    btn.classList.add("pressed");

    playSound(color + ".mp3");

    setTimeout(() => btn.classList.remove("pressed"), 200);

    setTimeout(() => {
        userinput = [];
        acceptingClicks = true;
    }, 400);
}

// --------------------------------------------------------------------
// USER INPUT
// --------------------------------------------------------------------

document.querySelectorAll(".btn").forEach(btn => {

    function handlePress() {
        if (!acceptingClicks) return;

        let chosen = btn.id;
        userinput.push(chosen);

        btn.classList.add("pressed");
        playSound(chosen + ".mp3");
        setTimeout(() => btn.classList.remove("pressed"), 150);

        check(userinput.length - 1);
    }

    btn.addEventListener("click", handlePress);

    btn.addEventListener("touchstart", e => {
        e.preventDefault();
        handlePress();
    }, { passive: false });
});

// --------------------------------------------------------------------
// CHECK LOGIC
// --------------------------------------------------------------------

function check(i) {
    if (input[i] !== userinput[i]) {

        if (level > highestlevel) {
            highestlevel = level;
            localStorage.setItem("score", highestlevel);
            document.getElementById("score").innerText = highestlevel;
        }

        gameover();
        return;
    }

    if (userinput.length === input.length) {
        acceptingClicks = false;
        level++;
        setTimeout(nextLevel, 800);
    }
}

// --------------------------------------------------------------------
// GAME OVER
// --------------------------------------------------------------------

function gameover() {
    acceptingClicks = false;
    input = [];
    userinput = [];

    document.body.style.backgroundColor = "red";
    playSound("wrong.mp3");

    setTimeout(() => {
        document.body.style.backgroundColor = "#011F3F";
    }, 300);

    document.querySelector("h1").innerText =
        "Game Over, Tap or Press Any Key to Restart";

     setTimeout(() => {
    enableStartListeners();
}, 600);
}

// --------------------------------------------------------------------
// RUN
// --------------------------------------------------------------------

enableStartListeners();
