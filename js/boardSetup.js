import { startPieces, squareIds, gameBoard } from './chess.js';

const columnsId = Array.from({ length: 8 }, (_, i) => String.fromCharCode(97 + i));

function squareIdGenerator() {
    let squareIds = [];
    for (let i = 8; i > 0; i--) {
        for (let j = 0; j < columnsId.length; j++) {
            squareIds.push(columnsId[j] + i);
        }
    }
    return squareIds;
}

function createBoard() {
    startPieces.forEach((startPiece, i) => {

        // create squares and insert pieces
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('square-id', squareIds[i]);
        square.innerHTML = startPiece;
        square.firstChild?.setAttribute('draggable', true);

        // pattern
        if (Math.floor(i / 8) % 2 === 0) {
            if (i % 2 === 0) {
                square.classList.add('light');
            } else {
                square.classList.add('dark');
            }
        } else if (i % 2 !== 0) {
            square.classList.add('light');
        } else {
            square.classList.add('dark');
        }

        // white pieces
        if (i <= 15) {
            square.firstChild?.firstChild.classList.add('black');
        }

        //black pieces
        if (i > 47) {
            square.firstChild?.firstChild.classList.add('white');
        }

        gameBoard.appendChild(square);
    });
}

export { createBoard, squareIdGenerator }