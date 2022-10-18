let state = ["X", "", "O", "", "X", "O", "", "", ""];

let square = document.querySelectorAll('.square');
square.forEach(i => addMark(i));
function addMark(i) {
    i.onclick = (e) => {
    if (i.innerText == "") {
        i.innerText += "X";
    };
};
    
};

const gameboard = (() => {
    const display = () => {
        for(let i=0; i<= (state.length - 1); i++) {
        document.getElementById([i]).innerText = state[i];
    }
};
    return {display};
})();

const gameFlowModule = (() => {

    

    return {};
})();

const playerFactory = (name) => {
    const getName = () => name;

    return {getName};
};

const player1 = playerFactory('X');
const player2 = playerFactory('O');

gameboard.display();

