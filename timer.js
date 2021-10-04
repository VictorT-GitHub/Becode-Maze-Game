let affichageSeconds = document.createElement('span');
let affichageEspace = document.createElement('span');
affichageEspace.innerHTML = ":";
let affichageTens = document.createElement('span');

let clock = document.createElement('p');
    clock.classList.add('clock');
    clock.classList.add('disabled');
    clock.appendChild(affichageSeconds);
    clock.appendChild(affichageEspace);
    clock.appendChild(affichageTens);


let seconds = 15;
let tens = 0;
affichageSeconds.innerHTML = seconds;
affichageTens.innerHTML = `0${tens}`;

let intervalTimeLevel; 


// ------------------------------
//           FUNCTIONS
// ------------------------------

function timer() {

    if (tens <= 9) {
        affichageTens.innerHTML = `0${tens}`;
    }
    
    if (tens > 9) {
        affichageTens.innerHTML = tens;
    }
    
    if (tens == 0) {
        
        seconds--;
        affichageSeconds.innerHTML = seconds;
        
        tens = 100;
        affichageTens.innerHTML = tens;
    }
    
    if (seconds <= 9) {
        affichageSeconds.innerHTML = `0${seconds}`;
    }

    tens--;

    // OUT OF TIME : GAME OVER CASE
    if (seconds == 0) {

        tens = 0;
        affichageTens.innerHTML = `0${tens}`;

        clearInterval(intervalTimeLevel);

        clearInterval(intervalTimeGame);

        gamePopUp("GAME OVER",
            `you failed level ${levelNumber + 1}`,
            `do you try again ?`,
            `exit game`,
            `try again`,
            0,
            resetGameTimer());
        
        document.querySelector('.player').remove();
    }
}

function startTimerLevel() {

    // Reset timming before start new level
    seconds = 15;
    tens = 0;
    affichageSeconds.innerHTML = seconds;
    affichageTens.innerHTML = `0${tens}`;

    // Start timming (when level start)
    intervalTimeLevel = setInterval(timer, 10);
}
