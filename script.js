// ----------------------
//        Variables
// ----------------------
let levelNumber = 0;


// ---------------------------
//          FUNCTIONS
// ---------------------------
function levelGenerator(currentLevel) {
    
    // Creation <main> in the <body> just after the <aside>
    let leMain = document.createElement('main');
    document.body.insertBefore(leMain, document.body.children[1]);

    
    // ------ MODIFICATION VARIABLES CSS (GRID) --------
    leMain.style.setProperty('--nbrRows', `repeat(${currentLevel.length}, 60px)`);
    leMain.style.setProperty('--nbrColumns', `repeat(${currentLevel[0].length}, 60px)`);
    
    // ------- LEVEL CREATION -------
    let i = 1;
    for (let arr of currentLevel) {
        
        for (let elem of arr) {
            
            let newSquare = document.createElement('section');
            
            newSquare.classList.add(elem);
            newSquare.setAttribute('id', i);
            
            if (elem === "*") { newSquare.classList.add("wall") }
            
            else { newSquare.classList.add("path")};
            
            leMain.appendChild(newSquare);
            
            i++;
        }}
        
        // ------- PLAYER CREATION -------
        let startPos = document.querySelector('.S');
        
        let player1 = document.createElement('section');
        
        player1.classList.add('player');
        
        startPos.appendChild(player1);
        
        
    // ------ KEYPRESS EVENT -------
    document.addEventListener('keydown', (e) => { 
        
        // Get ID of de current square -> transform this string into a number -> add the number of column in the maze-grid for target the next row in the grid
        let squareIdNumber = Number(player1.parentElement.getAttribute('id'));
        let squareUpId = squareIdNumber - currentLevel[0].length;
        let squareDownId = squareIdNumber + currentLevel[0].length;

        switch (e.key) {
            
            case 'ArrowUp':
            case 'z':
                if (document.getElementById(`${squareUpId}`).classList.contains('path')){
                    
                    document.getElementById(`${squareUpId}`).appendChild(player1);
                }
                break;
            
            case 'ArrowDown':
            case 's':
                if (document.getElementById(`${squareDownId}`).classList.contains("path")) {

                    document.getElementById(`${squareDownId}`).appendChild(player1);
                }
                break;

            case 'ArrowLeft':    
            case 'q':
                if (player1.parentElement.previousSibling.classList.contains("path")) {

                    player1.parentElement.previousSibling.appendChild(player1);  
                }
                break;

            case 'ArrowRight':
            case 'd':
                if (player1.parentElement.nextSibling.classList.contains("path")) {

                    player1.parentElement.nextSibling.appendChild(player1);  
                }
                break;

            default:
                    console.log(`Erreur: Touche ${e.key} non definie.`);
        }

        // ------- Win Event(Condition) --------
        if (player1.parentElement.getAttribute('id') === document.querySelector('.T').getAttribute('id')) {

            clearInterval(stockInterval);
            clearInterval(intervalStocked);
            
            if (levelNumber === (LEVEL_LIST.length - 1)) {
                removePopUp();
                endGamePopUp("VICTORY ! (Fin de la demo du jeu)",
                    `well done you passed level ${levelNumber} in ${14 - seconds}:${99 - tens} seconds`,
                    `you completed the whole game in ${totalSeconds}:${totalTens} seconds`,
                    `play again`);
                
            } else {
                removePopUp();
                creationWinPopUp();
            }
            
        }
    })
}


//  ----- FUNCTION REMOVE POPUP : remove all <div> -----
function removePopUp() {
    for (let elem of document.querySelectorAll('div')) {
        elem.remove();
    }
}


// ----- FUNCTION EXIT LEVEL : remove popUp + player + tiles + <main> -----
function exitLevel() {
    for (let section of document.querySelectorAll('section')) {
        section.remove();
    }
    document.body.children[1].remove(); // Remove le <main>

    removePopUp();
}


// -------------------------------------
//           START GAME BUTTON
// -------------------------------------

// Creation <aside> in the <body>
// Creation <playButton> in the <aside>
const aside = document.createElement('aside');

const playBtn = document.createElement('button');
playBtn.innerHTML = "JOUER";

aside.appendChild(playBtn);
document.body.insertBefore(aside, document.body.children[0]);


// Click Event Listener => call function [levelGenerator()]
playBtn.addEventListener('click', () => {
    
    playBtn.classList.toggle('disabled');
    clock.classList.toggle('disabled');
    
    // Reset [levelNumber] before start new game
    levelNumber = 0;
    levelGenerator(LEVEL_LIST[levelNumber]);
 
    resetGameTimer();
    startGameTimer();

    startTimerLevel();
});


// -------------------------------------------
//            function WIN POPUP
// -------------------------------------------
function creationWinPopUp() {
    // Creation text du popup 
    const divWinText = document.createElement('div');

        const winTextTime = document.createElement('p');
        const winText = document.createElement('p');
        winTextTime.innerHTML = `well done you passed level ${levelNumber + 1} in ${14 - seconds}:${99 - tens} seconds`;
        winText.innerHTML = `ready for level ${levelNumber + 2} ?`;

    divWinText.appendChild(winTextTime);
    divWinText.appendChild(winText);

    // Creation btns no/yes du popup
    const divWinBtns = document.createElement('div');
    divWinBtns.classList.add('winBtns');

        const winBtnNo = document.createElement('button');
        winBtnNo.innerHTML = `not today`;
        winBtnNo.addEventListener('click', () => {

            exitLevel();

            clock.classList.toggle('disabled');
            playBtn.classList.toggle('disabled');
        })

        const winBtnYes = document.createElement('button');
        winBtnYes.innerHTML = `YES !`;
        winBtnYes.addEventListener('click', () => {

            exitLevel();

            levelNumber++;
            levelGenerator(LEVEL_LIST[levelNumber]);

            startTimerLevel();
            startGameTimer();
        })

    divWinBtns.appendChild(winBtnNo);
    divWinBtns.appendChild(winBtnYes);

    // winText + winBtns => divPopUp => <aside>
    const divPopUp = document.createElement('div');
    divPopUp.classList.add('winPopUp');
    divPopUp.appendChild(divWinText);
    divPopUp.appendChild(divWinBtns);
    aside.appendChild(divPopUp);
}


// ------------------------------------------
//          function ENDGAME POPUP
// ------------------------------------------
function endGamePopUp(a, b, c, d){

    // Creation text du popup 
    const divVictoryText = document.createElement('div');

        const victoryText = document.createElement('p');
        victoryText.innerHTML = a;

        const victoryTextTime = document.createElement('p');
        victoryTextTime.innerHTML = b;
        
        const victoryTextTimeGame = document.createElement('p');
        victoryTextTimeGame.innerHTML = c;

    divVictoryText.appendChild(victoryText);
    divVictoryText.appendChild(victoryTextTime);
    divVictoryText.appendChild(victoryTextTimeGame);

    // Creation btns no/yes du popup
    const divVictoryBtns = document.createElement('div');
    divVictoryBtns.classList.add('winBtns');

        const victoryBtnNo = document.createElement('button');
        victoryBtnNo.innerHTML = `exit game`;
        victoryBtnNo.addEventListener('click', () => {

            exitLevel();

            clock.classList.toggle('disabled');
            playBtn.classList.toggle('disabled');
        })

        const victoryBtnYes = document.createElement('button');
        victoryBtnYes.innerHTML = d;
        victoryBtnYes.addEventListener('click', () => {

            exitLevel();

            // Reset [levelNumber] before start new game
            levelNumber = 0;
            levelGenerator(LEVEL_LIST[levelNumber]);

            resetGameTimer();
            startGameTimer();

            startTimerLevel();
        })

    divVictoryBtns.appendChild(victoryBtnNo);
    divVictoryBtns.appendChild(victoryBtnYes);

    // victoryText + victoryBtns => victoryPopUp => <aside>
    const victoryPopUp = document.createElement('div');
    victoryPopUp.classList.add('winPopUp');
    victoryPopUp.appendChild(divVictoryText);
    victoryPopUp.appendChild(divVictoryBtns);
    aside.appendChild(victoryPopUp);
}