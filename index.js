const square = document.querySelectorAll('.square');
square.forEach(i => 
        i.onclick = (e) => gameFlow.play(i));

//model - needs its own CRUD
const gameboard = (() => {
 //gameboard/state needs to be updated, methods to update state 
    let state =  [null, null, null, null, null, null, null, null, null];
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
            checkForWin();
            return player1turn = false;
           } else {
            i.innerText = "O";
            gameboard.state[i.id] = "O";
            checkForWin();
            return player1turn = true;
           }
    };
    const checkForWin = () => {
        if (gameboard.state[0] != null) {
            if (gameboard.state[0] == gameboard.state[1] && gameboard.state[0] == gameboard.state[2] ||
                gameboard.state[0] == gameboard.state[3] && gameboard.state[0] == gameboard.state[6] ||
                gameboard.state[0] == gameboard.state[4] && gameboard.state[0] == gameboard.state[8]) {
                   return console.log("YouWin");
                };
            };
        if (gameboard.state[2] != null) {
                if (gameboard.state[2] == gameboard.state[5] && gameboard.state[2] == gameboard.state[8] ||
                    gameboard.state[2] == gameboard.state[4] && gameboard.state[2] == gameboard.state[6]) {
                        return console.log("You Win");
                    };
                };
        if (gameboard.state[1] != null) {
            if (gameboard.state[1] == gameboard.state[4] && gameboard.state[1] == gameboard.state[7]) {
                return console.log("You Win");
            };
        };
        if (gameboard.state[3] != null ) {
            console.log(gameboard.state);
            if (gameboard.state[3] == gameboard.state[4] && gameboard.state[3] == gameboard.state[5]) {
                return console.log("You Win");
            }
        };
        if (gameboard.state[6] != null) {
            if (gameboard.state[6] == gameboard.state[7] && gameboard.state[6] == gameboard.state[8]) {
                return console.log("You Win");
            };
        };
    }; 

    

    return {play, checkForWin};
})();

const playerFactory = (name) => {
    const getName = () => name;
    return {getName};
};

const player1 = playerFactory('X');
const player2 = playerFactory('O');

displayController.display(gameboard.state);




