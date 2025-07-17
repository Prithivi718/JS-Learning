const cells= document.querySelectorAll(".cell");
const statusText= document.querySelector("#status-text");
const resetBtn= document.querySelector("#reset-btn");

const winningOptions= [
    [1,2,3], [4,5,6], [7,8,9],
    [1,5,9], [3,5,7],
    [1,4,7], [2,5,8], [3,6,9]
];

let options= ["", "", "", "", "", "", "", "", ""]; // TO calc the choices remaining
let currentPlayer= 'X';
let running= false;


initGame();

function initGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClikced));
    statusText.textContent= `${currentPlayer}'s turn`;
    resetBtn.addEventListener("click", resetGame)
    running= true;
}

function cellClikced(){
    const cellIndex= this.getAttribute("cellIndex");
    console.log(`Cell Clicked ${cellIndex}`);

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    // changePlayer();
    checkWinner();

}

function updateCell(cell, index){
    options[index]= currentPlayer;
    cell.textContent= currentPlayer;

}

function changePlayer(){
    currentPlayer= (currentPlayer === 'X') ? 'O' : 'X' ;
    statusText.textContent= `${currentPlayer}'s turn`;
}

function checkWinner() {
    let xWon = false;
    let oWon = false;

    for (let i = 0; i < winningOptions.length; i++) {
        const conditions = winningOptions[i];
        // Adjusted indices: winningOptions should use 0-based indices
        const cellA = options[conditions[0]];
        const cellB = options[conditions[1]];
        const cellC = options[conditions[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            if (cellA === 'X') {
                xWon = true;
            } else if (cellA === 'O') {
                oWon = true;
            }
        }
    }

    if (xWon && oWon) {
        statusText.textContent = "Both X and O have winning lines! (Invalid state)";
        running = false;
    } else if (xWon) {
        statusText.textContent = `X WON!!!`;
        running = false;
    } else if (oWon) {
        statusText.textContent = `O WON!!!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `It's a DRAW!!!!`;
        running = false;
    } else {
        changePlayer();
    }
}

function resetGame(){
    options= ["", "", "", "", "", "", "", "", ""]; // TO calc the choices remaining
    currentPlayer= 'X';
    statusText.textContent= `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent= "");
    running= true;

}

