import { king, queen, rook, bishop, knight, pawn } from './pieces.js';
import { createBoard, squareIdGenerator } from './boardSetup.js';
import { dragStart, dragOver, dragDrop } from './dragPieces.js'

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

function changePlayer() {
    if (playerGo === 'white') {
        playerGo = 'black';
    } else {
        playerGo = 'white';
    }
    playerDisplay.textContent = playerGo;
}

function checkForWin() { }

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);
});

export { startPieces, squareIds, gameBoard, changePlayer, playerGo }