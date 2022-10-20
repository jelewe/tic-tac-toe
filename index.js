const square = document.querySelectorAll('.square');
square.forEach(i => 
        i.onclick = (e) => gameFlow.play(i));

//model - needs its own CRUD
const gameboard = (() => {
 //gameboard/state needs to be updated, methods to update state 
    let state =  [null, null, null, null, null, null, null, null, null];
    const reset = (state) => {
        state = [null, null, null, null, null, null, null, null, null];
        console.log(gameboard.state);
        return state;
    }
    return {state, reset};
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
            if (gameboard.state[i.id] != null) {
                return;
            };
            i.innerText = "X";
            gameboard.state[i.id] = "X";
            checkForWin();
            return player1turn = false;
           } else {
            if (gameboard.state[i.id] != null) {
                return;
            };
            i.innerText = "O";
            gameboard.state[i.id] = "O";
            checkForWin();
            return player1turn = true;
           };
    };
    const checkForWin = () => {
        if (gameboard.state[0] != null) {
            if (gameboard.state[0] == gameboard.state[1] && gameboard.state[0] == gameboard.state[2] ||
                gameboard.state[0] == gameboard.state[3] && gameboard.state[0] == gameboard.state[6] ||
                gameboard.state[0] == gameboard.state[4] && gameboard.state[0] == gameboard.state[8]) {
                   console.log("YouWin");
                   gameFlow.stopPlay();
                };
            };
        if (gameboard.state[2] != null) {
                if (gameboard.state[2] == gameboard.state[5] && gameboard.state[2] == gameboard.state[8] ||
                    gameboard.state[2] == gameboard.state[4] && gameboard.state[2] == gameboard.state[6]) {
                        console.log("You Win");
                        gameFlow.stopPlay();
                    };
                };
        if (gameboard.state[1] != null) {
            if (gameboard.state[1] == gameboard.state[4] && gameboard.state[1] == gameboard.state[7]) {
                console.log("You Win");
                gameFlow.stopPlay();
            };
        };
        if (gameboard.state[3] != null ) {
            if (gameboard.state[3] == gameboard.state[4] && gameboard.state[3] == gameboard.state[5]) {
                console.log("You Win");
                gameFlow.stopPlay();
            };
        };
        if (gameboard.state[6] != null) {
            if (gameboard.state[6] == gameboard.state[7] && gameboard.state[6] == gameboard.state[8]) {
                console.log("You Win");
                gameFlow.stopPlay();
            };
        };
    };
    const stopPlay = () => {
        square.forEach(i => 
            i.onclick = null);
    };

    const resetGame = () => {
        gameboard.state = [null, null, null, null, null, null, null, null, null];
        displayController.display(gameboard.state);
        return player1turn = true;
    };
    

    return {play, checkForWin, stopPlay, resetGame};
})();

const playerFactory = (name) => {
    const getName = () => name;
    return {getName};
};

const player1 = playerFactory('X');
const player2 = playerFactory('O');

displayController.display(gameboard.state);




