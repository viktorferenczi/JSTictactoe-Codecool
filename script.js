const X_CLASS = 'x' // X
const CIRCLE_CLASS = 'circle' // O
const WINNING_COMBINATIONS = [ //defining the winning combos
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
// getting elements
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winnigMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame() //starting the game

restartButton.addEventListener('click', startGame) //defining restart button

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS) 
        cell.classList.remove(CIRCLE_CLASS) //cleaning stuff after restart
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell,currentClass) //placing sign

    if(checkWin(currentClass)){ //checking win for the current player
       endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns() //swapping turns and get board
        setBoardHoverClass()
    }
}

function endGame(draw){ //check the endgame result
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" :
        "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() { //check for draw
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell,currentClass){ //placing sign
    cell.classList.add(currentClass)
}

function swapTurns(){ //swapping turns
    circleTurn = !circleTurn
}

function setBoardHoverClass(){ //adding hovering effect
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn) { 
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){ //check if somebody won
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}