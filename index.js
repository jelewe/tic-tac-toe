const square = document.querySelectorAll('.square');
square.forEach(i => 
        i.onclick = (e) => gameFlow.play(i));

//model - needs its own CRUD
const gameboard = (() => {
 //gameboard/state needs to be updated, methods to update state 
    let state =  ["", "", "", "", "", "", "", "", ""];
    return {state};
})();

//view - also needs its own CRUD
const displayController = (() => {
    const display = (state) => {
        for(let i=0; i<= (state.length - 1); i++) {
        document.getElementById([i]).innerText = state[i];
    }
};
    return {display};
})();

//controller - control state changes, player turn is a game state, check for wins
const gameFlow = (() => {
    let player1turn = true;
    const play = (i) => {
           if (player1turn == true) {
            i.innerText = "X";
            gameboard.state[i.id] = "X";
            console.log(gameboard.state);
            console.log(i);
            checkForWin();
            return player1turn = false;
           } else {
            i.innerText = "O";
            gameboard.state[i.id] = "O";
            console.log(gameboard.state);
            console.log(i);
            checkForWin();
            return player1turn = true;
           }
    };
    const checkForWin = () => {

        }


    

    return {play, checkForWin};
})();

const playerFactory = (name) => {
    const getName = () => name;
    return {getName};
};

const player1 = playerFactory('X');
const player2 = playerFactory('O');

displayController.display(gameboard.state);




