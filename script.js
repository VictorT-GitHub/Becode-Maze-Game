// ----------------------
//        Variables
// ----------------------
let levelNumber = 0;

// Chronomètre le temps de jeu de toute la partie (tous les levels)
let gameTimming = 0;
setInterval(() => gameTimming++, 100)

// Chronomètre le temps de jeu du level en cour (currentLevel)
let levelTimming = 0;
setInterval(() => levelTimming++, 100)


// ----------------------
//        FUNCTIONS
// ----------------------
function creationDuJeux(currentLevel) {
    
    // Creation <main> in the <body> just after the <aside>
    let leMain = document.createElement('main');
    document.body.insertBefore(leMain, document.body.children[1]);

    // Reset du levelTimming
    levelTimming = 0;

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
    const startPos = document.querySelector('.S');

    let player1 = document.createElement('section');

    player1.classList.add('player');

    startPos.appendChild(player1);


    // ------ KEYPRESS EVENT -------
    document.addEventListener('keydown', (e) => {
        
        // Get ID of de current square -> transform this string into a number -> add the number of column in the maze-grid for target the next row in the grid
        let squareId = new Number(player1.parentElement.getAttribute('id'));
        let squareUpId = squareId - currentLevel[0].length;
        let squareDownId = squareId + currentLevel[0].length;

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

            winFunction();
        }
    })
}

function winFunction() {

    for (let section of document.querySelectorAll('section')) {
                section.remove();
            }
    document.body.children[1].remove(); // Remove le <main>


    levelNumber++;
    if (levelNumber === LEVEL_LIST.length || levelNumber > LEVEL_LIST.length) {

        alert(`VICTORY ! (Fin de la demo du jeu) Vous avez terminé le jeu en ${Math.floor(gameTimming / 60)},${gameTimming % 60} secondes !`);
        playBtn.style.visibility = "visible";

    } else {

        if (confirm(`Vous avez réussi le niveau ${levelNumber} en ${Math.floor(levelTimming / 60)},${levelTimming % 60} secondes ! Pret pour le niveau ${levelNumber + 1} ?`)) {
              
            creationDuJeux(LEVEL_LIST[levelNumber]);

        } else { playBtn.style.visibility = "visible" }
    }
}


// -----------------------------
//       LANCEMENT DU JEU
// -----------------------------

// Creation <aside> + <playButton>
const aside = document.createElement('aside');

const playBtn = document.createElement('button');
playBtn.innerHTML = "JOUER";

aside.appendChild(playBtn)
document.body.insertBefore(aside, document.body.children[0]);


// Click Event Listener => call function [creationDuJeux()]
playBtn.addEventListener('click', () => {

    playBtn.style.visibility = "hidden";

    levelNumber = 0;
    creationDuJeux(LEVEL_LIST[levelNumber]);
});

