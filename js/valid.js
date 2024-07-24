import { playerGo } from './chess.js';
import { startPositionId, draggedElement } from './dragPieces.js'
import { king } from './pieces.js';

let whiteCastling = [{ shortCastling: true }, { longCastling: true }];
let blackCastling = [{ shortCastling: true }, { longCastling: true }];

function highlightValidSquares(clickedElement) {
    // const allSquares = document.querySelectorAll('#game-board .square');
    // const startPositionId = clickedElement.getAttribute('square-id') || clickedElement.parentNode.getAttribute('square-id');
    // const draggedElement = clickedElement.firstChild || clickedElement;

    // if (!draggedElement.classList.contains('piece')) return;

    // const startColId = startPositionId.charCodeAt(0);
    // const startRowId = parseInt(startPositionId[1]);

    // allSquares.forEach(square => {
    //     const targetPositionId = square.getAttribute('square-id');
    //     const targetColId = targetPositionId.charCodeAt(0);
    //     const targetRowId = parseInt(targetPositionId[1]);
    //     const takenByOpponent = square.firstChild?.classList.contains(playerGo === 'white' ? 'black' : 'white');

    //     if (checkIfValid(square, takenByOpponent) && areSquaresClear(startColId, startRowId, targetColId, targetRowId)) {
    //         square.classList.add(takenByOpponent ? 'highlight-red' : 'highlight-blue');
    //     } else {
    //         square.classList.remove('highlight-red', 'highlight-blue');
    //     }
    // });
}

function isChecked(kingPos, playerGo) {
    const player = playerGo === 'black' ? 'white' : 'black';
    const directions = [
        { dx: 1, dy: 1 },  // Top-right
        { dx: -1, dy: 1 }, // Top-left
        { dx: 1, dy: -1 }, // Bottom-right
        { dx: -1, dy: -1 } // Bottom-left
    ];
    const pawnDirections = [
        { dx: 1, dy: playerGo === 'white' ? 1 : -1 },  // Right diagonal
        { dx: -1, dy: playerGo === 'white' ? 1 : -1 }  // Left diagonal
    ];

    let isKingInCheck = false;

    let knightSquares = [];
    let diagonalSquares = [];

    knightSquares.push(
        (String.fromCharCode(kingPos.charCodeAt(0) + 1)) + (parseInt(kingPos[1]) + 2),
        (String.fromCharCode(kingPos.charCodeAt(0) - 1)) + (parseInt(kingPos[1]) + 2),
        (String.fromCharCode(kingPos.charCodeAt(0) + 1)) + (parseInt(kingPos[1]) - 2),
        (String.fromCharCode(kingPos.charCodeAt(0) - 1)) + (parseInt(kingPos[1]) - 2),
        (String.fromCharCode(kingPos.charCodeAt(0) + 2)) + (parseInt(kingPos[1]) + 1),
        (String.fromCharCode(kingPos.charCodeAt(0) - 2)) + (parseInt(kingPos[1]) + 1),
        (String.fromCharCode(kingPos.charCodeAt(0) + 2)) + (parseInt(kingPos[1]) - 1),
        (String.fromCharCode(kingPos.charCodeAt(0) - 2)) + (parseInt(kingPos[1]) - 1)
    );

    knightSquares = knightSquares.filter(square => {
        const column = square.charCodeAt(0);
        const row = parseInt(square.slice(1));
        return column >= 97 && column <= 104 && row >= 1 && row <= 8;
    });

    knightSquares = knightSquares.map(id => document.querySelector(`[square-id="${id}"]`));

    if ((
        (Array.from(knightSquares).some(square => square?.querySelector('div')?.firstChild.classList.contains(player))) &&
        (Array.from(knightSquares).some(square => square?.querySelector('div')?.id === 'knight')))
    ) {
        isKingInCheck = true;
    }

    // Check for threats from bishops, queens
    for (let dir of directions) {
        let x = kingPos.charCodeAt(0);
        let y = parseInt(kingPos[1]);

        while (true) {
            x += dir.dx;
            y += dir.dy;

            if (x < 97 || x > 104 || y < 1 || y > 8) break; // Out of bounds

            const squareId = String.fromCharCode(x) + y;
            const element = document.querySelector(`[square-id="${squareId}"]`);

            if (element) {
                const piece = element.querySelector('div');
                if (piece?.firstChild.classList.contains(player) && (piece.id === 'bishop' || piece.id === 'queen')) {
                    isKingInCheck = true;
                    break; // Found a threatening bishop or queen
                }
                // Stop checking further in this direction if any piece is encountered
                if (piece) break;
            }
        }

        if (isKingInCheck) break; // Exit loop if the king is in check
    }

    // Check for pawn threats directly on the king's diagonal threat squares
    for (let dir of pawnDirections) {
        let x = kingPos.charCodeAt(0) + dir.dx;
        let y = parseInt(kingPos[1]) + dir.dy;

        if (x >= 97 && x <= 104 && y >= 1 && y <= 8) {
            const squareId = String.fromCharCode(x) + y;
            const element = document.querySelector(`[square-id="${squareId}"]`);

            if (element) {
                const piece = element.querySelector('div');
                if (piece?.firstChild.classList.contains(player) && piece.id === 'pawn' && checkIfValid(element, true)) {
                    isKingInCheck = true;
                    break;
                }
            }
        }
    }

    return isKingInCheck;
}

function checkSkips(validMoves) {
    const checkSquares = validMoves.map(id => document.querySelector(`[square-id="${id}"]`));

    if (Array.from(checkSquares).some(square => square.querySelector('div') !== null)) {
        return false;
    } else {
        return true;
    }
}

function validCastling() {
    const rooks = document.querySelectorAll('#rook');


}

function checkIfValid(target, takenByOpponent) {
    const isCapturing = takenByOpponent !== undefined ? true : false;

    const piece = draggedElement.id;

    const startColId = startPositionId.charCodeAt(0);
    const startRowId = parseInt(startPositionId[1]);
    const targetColId = (target.getAttribute('square-id') || target.parentNode.getAttribute('square-id')).charCodeAt(0);
    const targetRowId = parseInt((target.getAttribute('square-id') || '')[1]) || parseInt((target.parentNode.getAttribute('square-id') || '')[1]);


    const colDiff = Math.abs(targetColId - startColId);
    const rowDiff = Math.abs(targetRowId - startRowId);

    const firstMoveRow = playerGo === 'white' ? 2 : 7;
    const forward = playerGo === 'white' ? 1 : -1;

    let validMoves = [];

    /* console.log(`piece: ${piece}; 
        is capturing: ${isCapturing}; forward: ${forward};
        column difference: ${colDiff}; row difference ${rowDiff};
        start column: ${startColId}; start row: ${startRowId}; 
        target column: ${targetColId}; target row: ${targetRowId};
        column difference: ${colDiff}; row difference: ${rowDiff}`); */

    switch (piece) {

        case 'pawn':
            if (isCapturing) {
                if (colDiff === 1 && (targetRowId - startRowId) === forward) {
                    return true;
                }
            } else {
                if (colDiff === 0 && (targetRowId - startRowId === forward ||
                    (startRowId === firstMoveRow && targetRowId - startRowId === forward * 2))) {
                    validMoves.push(String.fromCharCode(startColId) + (startRowId + forward));
                    if (checkSkips(validMoves)) {
                        return true;
                    }
                }
            }
            break;

        case 'knight':
            if (colDiff + rowDiff === 3) {
                return true;
            }
            break;

        //TODO: make sure this is not going over other pieces
        case 'rook':
            if (colDiff === 0) {
                for (let row = Math.min(startRowId, targetRowId) + 1; row < Math.max(startRowId, targetRowId); row++) {
                    validMoves.push(String.fromCharCode(startColId) + row);
                }
                if (checkSkips(validMoves)) {
                    return true;
                }
            } else if (rowDiff === 0) {
                for (let col = Math.min(startColId, targetColId) + 1; col < Math.max(startColId, targetColId); col++) {
                    validMoves.push(String.fromCharCode(col) + startRowId);
                }
                if (checkSkips(validMoves)) {
                    return true;
                }
            }
            break;

        case 'bishop':
            if (colDiff === rowDiff) {
                if (startColId - targetColId > 0) {
                    if (startRowId - targetRowId > 0) {
                        for (let i = 1; i < colDiff; i++) {
                            validMoves.push(String.fromCharCode(startColId - i) + (startRowId - i));
                        }
                    } else {
                        for (let i = 1; i < colDiff; i++) {
                            validMoves.push(String.fromCharCode(startColId - i) + (startRowId + i));
                        }
                    }
                } else if (targetColId - startColId) {
                    if (startRowId - targetRowId > 0) {
                        for (let i = 1; i < colDiff; i++) {
                            validMoves.push(String.fromCharCode(startColId + i) + (startRowId - i));
                        }
                    } else {
                        for (let i = 1; i < colDiff; i++) {
                            validMoves.push(String.fromCharCode(startColId + i) + (startRowId + i));
                        }
                    }
                }
                if (checkSkips(validMoves)) {
                    return true;
                }
            }
            break;

        case 'queen':
            if ((colDiff === 0 || rowDiff === 0) || (colDiff === rowDiff) || (colDiff < 2 && rowDiff < 2)) {
                if (colDiff === 0) {
                    for (let row = Math.min(startRowId, targetRowId) + 1; row < Math.max(startRowId, targetRowId); row++) {
                        validMoves.push(String.fromCharCode(startColId) + row);
                    }
                } else if (rowDiff === 0) {
                    for (let col = Math.min(startColId, targetColId) + 1; col < Math.max(startColId, targetColId); col++) {
                        validMoves.push(String.fromCharCode(col) + startRowId);
                    }
                } else if (startColId - targetColId > 0) {
                    if (startRowId - targetRowId > 0) {
                        for (let i = 1; i < colDiff; i++) {
                            validMoves.push(String.fromCharCode(startColId - i) + (startRowId - i));
                        }
                    } else {
                        for (let i = 1; i < colDiff; i++) {
                            validMoves.push(String.fromCharCode(startColId - i) + (startRowId + i));
                        }
                    }
                } else if (targetColId - startColId) {
                    if (startRowId - targetRowId > 0) {
                        for (let i = 1; i < colDiff; i++) {
                            validMoves.push(String.fromCharCode(startColId + i) + (startRowId - i));
                        }
                    } else {
                        for (let i = 1; i < colDiff; i++) {
                            validMoves.push(String.fromCharCode(startColId + i) + (startRowId + i));
                        }
                    }
                }
                if (checkSkips(validMoves)) {
                    return true;
                }
            }
            break;

        case 'king':
            if (colDiff < 2 && rowDiff < 2) {
                return true;
            } else if (colDiff === 2 && rowDiff === 0) {
                // TODO: Check for castling
                const isShortCastling = targetColId === startColId + 2;
                const isLongCastling = targetColId === startColId - 2;

                if (isShortCastling || isLongCastling) {
                    // TODO: Additional checks for castling conditions (squares between clear, no previous moves, etc.)
                    // TODO: castling logic
                    return true;
                }
            }
            break;
    }
}

export { checkIfValid, highlightValidSquares, isChecked }