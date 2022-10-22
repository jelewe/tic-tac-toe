
//model /gamestate data
const gameboard = (() => {
    let state =  [null, null, null, null, null, null, null, null, null];
    return {state};
})();

//view / DOM
const displayController = (() => {
    const display = (state) => {
        for(let i=0; i<= (state.length - 1); i++) {
        document.getElementById([i]).innerText = state[i];
        };
    };

    const displayWinner = (player1turn) => {
        const div = document.querySelector('#winnerDisplay');
        if (player1turn == true) {
            div.innerText = "Player 1 wins!";
        } else if (player1turn == false) {
            div.innerText = "Player 2 wins!";
        } else if (player1turn == null) {
            div.innerText = "It's a tie!";
        };
    };

    const resetDiv = () => {
        const div = document.querySelector('#winnerDisplay');
        div.innerText = "";
    }
    return {display, displayWinner, resetDiv};
})();

//controller / gameplay logic
const gameFlow = (() => {
    const startMenu = document.querySelector('.start');
    const square = document.querySelectorAll('.square');
    const span1 = document.querySelector('.one');
    const span2 = document.querySelector('.two');
    let player1turn = true;
    let win = false;

    const play = (i) => {
           if (player1turn == true) {
            if (gameboard.state[i.id] != null) {
                return;
            };
            i.innerText = "X";
            gameboard.state[i.id] = "X";
            checkForWin();
            return player1turn = false;
           } 
           else {
            if (gameboard.state[i.id] != null) {
                return;
            };
            i.innerText = "O";
            gameboard.state[i.id] = "O";
            checkForWin();
            return player1turn = true;
           };
    };

    const playComputer = (i) => {
        if (gameboard.state[i.id] != null) {
                return;
         } else {
            i.innerText = "X";
            gameboard.state[i.id] = "X";
            checkForWin();
            player1turn = false;
         };
           if (win == false) {
            // if computerEasy = true,
            computerMove();
            //else,
            //computerMoveHard();
    };
};

    const computerMove = () => {
        let computerChoice = square[Math.floor(Math.random()*square.length)];
        if (gameboard.state[computerChoice.id] != null) {
            computerMove();
        } else {
            computerMark(computerChoice);
            checkForWin();
            return player1turn = true;
        };
    };

    const computerMark = (c) => {
        c.innerText = "O";
        gameboard.state[c.id] = "O";
    }

    const checkForWin = () => {
        if (gameboard.state[4] != null){
            if (gameboard.state[0] == gameboard.state[4] && gameboard.state[0] == gameboard.state[8] ||
                gameboard.state[2] == gameboard.state[4] && gameboard.state[2] == gameboard.state[6] ||
                gameboard.state[1] == gameboard.state[4] && gameboard.state[1] == gameboard.state[7] ||
                gameboard.state[3] == gameboard.state[4] && gameboard.state[3] == gameboard.state[5]) {
                    displayController.displayWinner(player1turn);
                    gameFlow.stopPlay();
                    return win= true;
                };
        };
        if (gameboard.state[2] != null) {
                if (gameboard.state[2] == gameboard.state[5] && gameboard.state[2] == gameboard.state[8] ||
                    gameboard.state[0] == gameboard.state[1] && gameboard.state[0] == gameboard.state[2]) {
                        displayController.displayWinner(player1turn);
                        gameFlow.stopPlay();
                        return win= true;
                    };
                };
        if (gameboard.state[6] != null) {
            if (gameboard.state[6] == gameboard.state[7] && gameboard.state[6] == gameboard.state[8] ||
                gameboard.state[0] == gameboard.state[3] && gameboard.state[0] == gameboard.state[6]) {
                displayController.displayWinner(player1turn);
                gameFlow.stopPlay();
                return win= true;
            };
        };
        if (gameboard.state.every((x) => x !== null)) {
                displayController.displayWinner(null);
                return win= true;
            };
        };

    const stopPlay = () => {
        square.forEach(i => 
            i.onclick = null);
    };

    const resetGame = () => {
        gameboard.state = [null, null, null, null, null, null, null, null, null];
        displayController.display(gameboard.state);
        displayController.resetDiv();
        startMenu.style.display = '';
        gameFlow.start();
        win = false;
        return player1turn = true;
    };

    const start = () => {
        startMenu.style.position = 'absolute';
        startMenu.style.height= '100%';
        startMenu.style.width= '100%';
        startMenu.innerText= (`
        
        Let's play tic-tac-toe!
        
        Choose gameplay:
        
        `);
        let button1 = document.createElement('button');
        button1.addEventListener('click', start2Player);
        button1.classList = 'startBtn';
        button1.innerText = "2 players";
        startMenu.appendChild(button1);
        let button2 = document.createElement('button');
        button2.addEventListener('click', startComputer);
        button2.classList = 'startBtn';
        button2.innerText = "Computer";
        startMenu.appendChild(button2);
    };

    const start2Player = () => {
        span1.innerText = ("Player 1: Human");
        span2.innerText = ("Player 2: Human");
        square.forEach(i => 
        i.onclick = (e) => gameFlow.play(i));
        startMenu.style.display = 'none';
    };

    const startComputer = () => {
        span1.innerText = ("Player 1: Human");
        span2.innerText = ("Player 2: Computer");
        square.forEach(i => 
            i.onclick = (e) => gameFlow.playComputer(i));
        startMenu.style.display = 'none';
    };

    return {play, playComputer, checkForWin, stopPlay, resetGame, start};
})();

gameFlow.start();

/* console.log(Math.floor(Math.random()*5));

//make move() ??? would cut down on repeat code. might need to bring back playerFactory 

//---- turn 1
//max
if (gameboard.state[4] != null) {
    let 0 = gameboard.state[0], 1= 2, 3= 6, 4=8
    move gameboard.state[Math.floor(Math.random()*5)]
//min
} else {
    move gameboard.state[4]
}

//---- turn 2
//min
if ((gameboard.state[2] == 'X' &&
    gameboard.state[1] == 'X') ||
    (gameboard.state[6] == 'X' &&
    gameboard.state[3] == 'X') ||
    (gameboard.state [4] == 'X' && 
     gameboard.state[8] == 'X')) {
        move gameboard.state [0]

} else if ((gameboard.state[0] == 'X' &&
    gameboard.state[2] == 'X') ||
    (gameboard.state[4] == 'X' &&
    gameboard.state[7] == 'X')) {
        move gameboard.state[1]

} else if ((gameboard.state[0] == 'X' &&
gameboard.state[1] == 'X') ||
(gameboard.state[8] == 'X' &&
gameboard.state[5] == 'X') ||
(gameboard.state [4] == 'X' && 
 gameboard.state[6] == 'X')) {
    move gameboard.state[2]

} else if ((gameboard.state[0] == 'X' &&
gameboard.state[6] == 'X') ||
(gameboard.state[4] == 'X' &&
gameboard.state[5] == 'X')) {
    move gameboard.state[3]

} else if ((gameboard.state[2] == 'X' &&
gameboard.state[8] == 'X') ||
(gameboard.state[3] == 'X' &&
gameboard.state[4] == 'X')) {
    move gameboard.state[5]

} else if ((gameboard.state[0] == 'X' &&
    gameboard.state[3] == 'X') ||
    (gameboard.state[8] == 'X' &&
    gameboard.state[7] == 'X') ||
    (gameboard.state [4] == 'X' && 
    gameboard.state[2] == 'X')) {
        move gameboard.state[6]

} else if ((gameboard.state[6] == 'X' &&
    gameboard.state[8] == 'X') || 
    (gameboard.state[6] == 'X' &&
    gameboard.state[8] == 'X')) {
        move gameboard.state[7]

} else if ((gameboard.state[2] == 'X' &&
    gameboard.state[5] == 'X') ||
    (gameboard.state[6] == 'X' &&
    gameboard.state[7] == 'X') ||
    (gameboard.state [4] == 'X' && 
     gameboard.state[0] == 'X')) {
        move gameboard.state [8]
//max
//you can likely condense these conditions
} else if (gameboard.state [4] == 'X' && 
            (gameboard.state[6] == 'X') ||
            (gameboard.state [0] == 'X' && 
            gameboard.state[4] == 'X')) {
                move gameboard.state[2]
} else if ((gameboard.state [0] == 'O' && 
    gameboard.state[1] == 'O') ||
    (gameboard.state [8] == 'O' && 
    gameboard.state[5] == 'O')) {
        move gameboard.state[8]
} else {
    let 0 = gameboard.state[0], 1= 2, 3= 6, 4=8
    move gameboard.state[Math.floor(Math.random()*5)]
}

//---- turn 3

//max
if (gameboard.state[0] == null) {
    if ((gameboard.state[1] == 'O' && gameboard.state [2] == 'O') ||
    (gameboard.state[3] == 'O' && gameboard.state [6] == 'O') ||
    (gameboard.state[4] == 'O' && gameboard.state [8] == 'O')) {
        move gameboard.state[0]
        checkForWin();
    };
 }
if (gameboard.state[1] == null) {
    if ((gameboard.state[0] == 'O' && gameboard.state [2] == 'O') ||
    (gameboard.state[4] == 'O' && gameboard.state [7] == 'O')) {
        move gameboard.state[1]
        checkForWin();
    };
} 
if (gameboard.state[2] == null) {
    if ((gameboard.state[0] == 'O' && gameboard.state [1] == 'O') ||
    (gameboard.state[5] == 'O' && gameboard.state [8] == 'O') ||
    (gameboard.state[4] == 'O' && gameboard.state [6] == 'O')) {
        move gameboard.state[2]
        checkForWin();
    };
} if (gameboard.state[3] == null) {
    if ((gameboard.state[0] == 'O' && gameboard.state [6] == 'O') ||
    (gameboard.state[4] == 'O' && gameboard.state [5] == 'O')) {
        move gameboard.state[3]
        checkForWin();
    };
} 
if (gameboard.state[5] == null) {
    if ((gameboard.state[2] == 'O' && gameboard.state [8] == 'O') ||
    (gameboard.state[3] == 'O' && gameboard.state [4] == 'O')) {
        move gameboard.state[5]
        checkForWin();
    };
} 
if (gameboard.state[6] == null) {
    if ((gameboard.state[0] == 'O' && gameboard.state [3] == 'O') ||
    (gameboard.state[7] == 'O' && gameboard.state [8] == 'O') || 
    (gameboard.state[2] == 'O' && gameboard.state [4] == 'O')) {
        move gameboard.state[6]
        checkForWin();
    };
} 
if (gameboard.state[7] == null) {
    if ((gameboard.state[0] == 'O' && gameboard.state [4] == 'O') ||
        (gameboard.state[6] == 'O' && gameboard.state [8] == 'O')) {
            move gameboard.state[7]
            checkForWin();
        };
} if (gameboard.state[8] == null) {
    if ((gameboard.state[2] == 'O' && gameboard.state [5] == 'O') ||
        (gameboard.state[6] == 'O' && gameboard.state [7] == 'O') || 
        (gameboard.state[0] == 'O' && gameboard.state [4] == 'O')) {
            move gameboard.state[8]
            checkForWin();
        };
    }

 //min
if (gameboard.state[4] == 'X') {
    if (gameboard.state[1] == 'X'){
        move gameboard.state[7]
    } else if (gameboard.state[3] == 'X') {
        move gameboard.state[5]
    } else if (gameboard.state[5] =='X'){
        move gameboard.state[3]
    } else if (gameboard.state[7] == 'X'){
        move gameboard.state[1]
    } else if (gameboard.state[6] == 'X' && gameboard.state[8] == 'X'){
        move gameboard.state[7]
    };

}

// ---- turn 4
//min
if (gameboard.state[4] == 'X') {
    if (gameboard.state[3] == 'X') {
        move gameboard.state[5]
    } else if (gameboard.state [5] == 'X') {
        move gameboard.state[3]
    }
let 0 = gameboard.state[0], 1= 2, 3= 6, 4=8
    move gameboard.state[Math.floor(Math.random()*5)]

*/









