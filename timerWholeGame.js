let totalSeconds = 0;
let totalTens = 0;

let intervalTimeGame;

// ------------------------------
//           FUNCTIONS
// ------------------------------
function timerWholeGame() {

    totalTens++;

    if (totalTens > 99) {
        
        totalSeconds++;
        
        totalTens = 0;
    }
}

function startGameTimer() {
    intervalTimeGame = setInterval(timerWholeGame, 10);
}

function resetGameTimer() {
    totalSeconds = 0;
    totalTens = 0;
}