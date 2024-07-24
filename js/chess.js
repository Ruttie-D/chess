import { king, queen, rook, bishop, knight, pawn } from './pieces.js';
import { createBoard, squareIdGenerator } from './boardSetup.js';
import { dragStart, dragOver, dragDrop } from './dragPieces.js'
import { highlightValidSquares } from './valid.js';

const gameBoard = document.querySelector('.game-board');
// const allSquares = document.querySelectorAll('#game-board .square');
const playerDisplay = document.querySelector('#player');
const infoDisplay = document.querySelector('#info-display');

let playerGo = 'white';

playerDisplay.textContent = playerGo;

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
];

const squareIds = squareIdGenerator();

createBoard();

const allSquares = document.querySelectorAll('#game-board .square');
// allSquares.forEach((square) => console.log(square.getAttribute('square-id')));
for (let i = 0; i < allSquares.length; i++) {
    // console.log(allSquares[i]);
}

function changePlayer() {
    if (playerGo === 'white') {
        playerGo = 'black';
    } else {
        playerGo = 'white';
    }
    playerDisplay.textContent = playerGo;
}

function checkForWin() {

}
checkForWin();

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);

    square.addEventListener('click', (e) => highlightValidSquares(e.target));
});

export { startPieces, squareIds, gameBoard, changePlayer, playerGo, playerDisplay }