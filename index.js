
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
            computerMove();
    };
};

    const computerMove = () => {
        computerChoice = square[Math.floor(Math.random()*square.length)];
        if (gameboard.state[computerChoice.id] != null) {
            computerMove();
        } else {
            computerChoice.innerText = "O";
            gameboard.state[computerChoice.id] = "O";
            checkForWin();
            return player1turn = true;
        };
    };

    const checkForWin = () => {
        if (gameboard.state[0] != null) {
            if (gameboard.state[0] == gameboard.state[1] && gameboard.state[0] == gameboard.state[2] ||
                gameboard.state[0] == gameboard.state[3] && gameboard.state[0] == gameboard.state[6] ||
                gameboard.state[0] == gameboard.state[4] && gameboard.state[0] == gameboard.state[8]) {
                    displayController.displayWinner(player1turn);
                   gameFlow.stopPlay();
                   return win= true;
                };
            };
        if (gameboard.state[2] != null) {
                if (gameboard.state[2] == gameboard.state[5] && gameboard.state[2] == gameboard.state[8] ||
                    gameboard.state[2] == gameboard.state[4] && gameboard.state[2] == gameboard.state[6]) {
                        displayController.displayWinner(player1turn);
                        gameFlow.stopPlay();
                        return win= true;
                    };
                };
        if (gameboard.state[1] != null) {
            if (gameboard.state[1] == gameboard.state[4] && gameboard.state[1] == gameboard.state[7]) {
                displayController.displayWinner(player1turn);
                gameFlow.stopPlay();
                return win= true;
            };
        };
        if (gameboard.state[3] != null ) {
            if (gameboard.state[3] == gameboard.state[4] && gameboard.state[3] == gameboard.state[5]) {
                displayController.displayWinner(player1turn);
                gameFlow.stopPlay();
                return win= true;
            };
        };
        if (gameboard.state[6] != null) {
            if (gameboard.state[6] == gameboard.state[7] && gameboard.state[6] == gameboard.state[8]) {
                displayController.displayWinner(player1turn);
                gameFlow.stopPlay();
                return win= true;
            };
        };
        if (gameboard.state[0] != null && 
            gameboard.state[1] != null &&
            gameboard.state[2] != null &&
            gameboard.state[3] != null &&
            gameboard.state[4] != null &&
            gameboard.state[5] != null &&
            gameboard.state[6] != null &&
            gameboard.state[7] != null &&
            gameboard.state[8] != null) {
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




