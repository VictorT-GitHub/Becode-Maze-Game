const leMain = document.querySelector('main');


// ------- LEVEL CREATION -------
let i = 1;
for (let arr of LEVEL_1) {

    for (let elem of arr) {

        let newSquare = document.createElement('section');

        newSquare.classList.add("allSquares", elem);
        newSquare.setAttribute('id', i)

        if (elem === "*") { newSquare.classList.add("wall") }

        else { newSquare.classList.add("path")};

        leMain.appendChild(newSquare);

        i++;
    }
}

// ------- PLAYER CREATION -------
let startPos = document.querySelector('.S');

let player1 = document.createElement('section');

player1.classList.add('player');

startPos.appendChild(player1);


// ------ KEYPRESS EVENT -------
document.addEventListener('keypress', (e) => {
    
    // Get ID of de current square -> transform this string into a number -> add the number of column in the maze-grid for target the next row in the grid
    let squareId = new Number(player1.parentElement.getAttribute('id'));
    let squareUpId = squareId - LEVEL_1[0].length;
    let squareDownId = squareId + LEVEL_1[0].length;

    switch (e.key) {
        
        case 'z':
            if (document.getElementById(`${squareUpId}`).classList.contains('path')){
                
                document.getElementById(`${squareUpId}`).appendChild(player1);
            }
            break;
            
        case 's':
            if (document.getElementById(`${squareDownId}`).classList.contains("path")) {

                document.getElementById(`${squareDownId}`).appendChild(player1);
            }
             break;

        case 'q':
            if (player1.parentElement.previousSibling.classList.contains("path")) {

                player1.parentElement.previousSibling.appendChild(player1);  
            }
            break;

        case 'd':
            if (player1.parentElement.nextSibling.classList.contains("path")) {

                player1.parentElement.nextSibling.appendChild(player1);  
            }
            break;

        default:
                console.log(`Erreur: Touche ${e.key} non definie.`);
    }

    // ------- Win Event --------
    if (player1.parentElement.getAttribute('id') === document.querySelector('.T').getAttribute('id')) {
        confirm("Vous avez réussi ! Pret pour le niveau 2 ?")
    }
})

