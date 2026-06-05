(function () {
    "use strict";
    console.log("reading JS");

    // constants
    const winScore = 30;
    const dieFaces = 6;

    const die = {
        1: "images/1.svg",
        2: "images/2.svg",
        3: "images/3.svg",
        4: "images/4.svg",
        5: "images/5.svg",
        6: "images/6.svg",
    };

    // audio
    const sfxClap = new Audio("audio/clap.mp3");
    const sfxShake = new Audio("audio/shake.mp3");

    // dom refs
    const turnIndicator = document.getElementById("turn-indicator");
    const rollBtn = document.getElementById("roll-btn");
    const stopBtn = document.getElementById("stop-btn");
    const rulesBtn = document.getElementById("ingame-rules-btn");
    const die1Img = document.getElementById("die1-img");
    const die2Img = document.getElementById("die2-img");

    const p1Total = document.getElementById("p1-total");
    const p1Fish = document.getElementById("p1-fish");
    const p2Total = document.getElementById("p2-total");
    const p2Fish = document.getElementById("p2-fish");

    const p1Col = document.querySelector(".p1-side");
    const p2Col = document.querySelector(".p2-side");

    // game state
    let scores = [0, 0];   // banked totals
    let turnFish = [0, 0];   // fish rolled this turn (running total this turn)
    let current = 0;        // 0 = player 1, 1 = player 2
    let gameOver = false;

    // main dice logic
    function roll() {
        return Math.floor(Math.random() * dieFaces) + 1;
    }

    function showDie(imgEl, value) {
        imgEl.src = die[value];
        imgEl.classList.remove("hidden");
    }

    function updateScoreDisplay() {
        p1Total.textContent = scores[0];
        p2Total.textContent = scores[1];
        p1Fish.textContent = turnFish[0];
        p2Fish.textContent = turnFish[1];
    }

    function updateTurnIndicator(extra) {
        const name = `Player ${current + 1}`;
        turnIndicator.textContent = extra ? `${name}: ${extra}` : `Turn: ${name}`;
    }

    function highlightActivePlayer() {
        p1Col.classList.toggle("active", current === 0);
        p2Col.classList.toggle("active", current === 1);
    }

    function setButtonsDisabled(disabled) {
        rollBtn.disabled = disabled;
        stopBtn.disabled = disabled;
    }

    // fish count for accumulated points during a turn
    function refreshFishDisplay() {
        p1Fish.textContent = current === 0 ? turnFish[current] : 0;
        p2Fish.textContent = current === 1 ? turnFish[current] : 0;
    }

    // win/lose
    function declareWinner() {
        gameOver = true;
        setButtonsDisabled(true);

        const winner = `Player ${current + 1}`;
        turnIndicator.textContent = `${winner} wins! 🦭`;
        sfxClap.play();

        // replace roll button with a restart button
        rollBtn.textContent = "Play Again";
        rollBtn.classList.remove("roll");
        rollBtn.classList.add("restart");
        rollBtn.disabled = false;
        rollBtn.removeEventListener("click", handleRoll);
        rollBtn.addEventListener("click", restartGame);

        stopBtn.style.display = "none";
    }

    // bust (rolled a 1)
    function bust() {
        turnFish[current] = 0;
        refreshFishDisplay();
        updateTurnIndicator("Blehhhhh!");

        setButtonsDisabled(true);
        setTimeout(() => {
            switchTurn();
            setButtonsDisabled(false);
        }, 1200);
    }

    // switch turns
    function switchTurn() {
        turnFish[current] = 0;   // reset turn fish for player who just ended
        current = current === 0 ? 1 : 0;
        die1Img.classList.add("hidden");
        die2Img.classList.add("hidden");
        updateTurnIndicator();
        highlightActivePlayer();
        refreshFishDisplay();
    }

    // roll handler
    function handleRoll() {
        if (gameOver) return;

        const d1 = roll();
        const d2 = roll();
        showDie(die1Img, d1);
        showDie(die2Img, d2);

        const sum = d1 + d2;

        // any die with 1 = bust
        if (d1 === 1 || d2 === 1) {
            bust();
            return;
        }

        turnFish[current] += sum;
        refreshFishDisplay();
        updateTurnIndicator(`Turn fish: ${turnFish[current]}`);
    }

    // end turn
    function handleStop() {
        if (gameOver) return;
        sfxShake.currentTime = 0;
        sfxShake.play();

        scores[current] += turnFish[current];
        p1Total.textContent = scores[0];
        p2Total.textContent = scores[1];

        if (scores[current] >= winScore) {
            declareWinner();
            return;
        }

        switchTurn();
    }

    // restart
    function restartGame() {
        scores = [0, 0];
        turnFish = [0, 0];
        current = 0;
        gameOver = false;

        p1Total.textContent = 0;
        p2Total.textContent = 0;
        refreshFishDisplay();

        die1Img.classList.add("hidden");
        die2Img.classList.add("hidden");

        rollBtn.textContent = "Roll";
        rollBtn.classList.remove("restart");
        rollBtn.classList.add("roll");
        rollBtn.disabled = false;
        rollBtn.removeEventListener("click", restartGame);
        rollBtn.addEventListener("click", handleRoll);

        stopBtn.style.display = "";
        stopBtn.disabled = false;

        updateTurnIndicator();
        highlightActivePlayer();
    }

    rollBtn.addEventListener("click", handleRoll);
    stopBtn.addEventListener("click", handleStop);

    updateTurnIndicator();
    highlightActivePlayer();
    refreshFishDisplay();

})();
