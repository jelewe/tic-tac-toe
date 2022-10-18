let state = ["X", "", "O", "", "X", "O", "", "", ""];



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
    const square = document.querySelectorAll('.square');
    const getName = () => name;
    const addMark = (i) => {
        square.forEach(i => 
        i.onclick = (e) => {
        if (i.innerText == "") {
            i.innerText = getName();
            };
            //update state???
        });
    };

    return {getName, addMark};
};

const player1 = playerFactory('X');
const player2 = playerFactory('O');

gameboard.display();
player2.addMark();

