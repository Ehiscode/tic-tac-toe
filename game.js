var cells = document.querySelectorAll('.cell');
var result = document.querySelector('.textOtp'); 
var reset = document.querySelector('.reset');

//the cells to check for for winning conditions
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]; 

var options = ['', '', '', '', '', '', '', '', ''] // array of placeholders for each cell, 1 for each cell
var currentPlayer = 'X'
var running = false //game is false at the beginning because its not running

startGame(); 

function startGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    reset.addEventListener('click', restart);
    result.textContent = `${currentPlayer}'s turn`
    running = true
}
function cellClicked() {
    var cellIndex = this.getAttribute('cellIndex')
    
    if(options[cellIndex] != '' || !running) { //if the cells are not empty || the game is not running, do nothing! or we can only pass in input if the cells are empty
        return;
    }
    updateCell(this, cellIndex)
    // changePlayer()
    checkWinner()
}
function updateCell(cell, index) {
    options[index] = currentPlayer
    cell.textContent = currentPlayer;
}
function changePlayer() {
    currentPlayer = (currentPlayer === 'X')? 'O' : 'X'
    result.textContent = `${currentPlayer}'s turn`
}
function checkWinner() {
    let roundWon = false;
     for(i = 0; i < winConditions.length; i++) {  //check(iterate) through every row/ column in the win conditions
        const conditions = winConditions[i];
        
        const cellA = options[conditions[0]]
        const cellB = options[conditions[1]]
        const cellC = options[conditions[2]]

        if(cellA == '' || cellB == '' || cellC == '') {
            continue;
        }
        if(cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        result.textContent = `${currentPlayer} wins!`
        running = false; //game stops
    }else if(!options.includes('')){
        result.textContent = 'Draw!'
        running = false;
    }
    else{
        changePlayer()
    }
}
function restart() {
    currentPlayer = 'X'
    options = ['', '', '', '', '', '', '', '', '']
    result.textContent = `${currentPlayer}'s turn`
    cells.forEach(cell => cell.textContent = '')
    running = true;
}