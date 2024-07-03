import { playerGo } from './chess.js';
import { startPositionId, draggedElement } from './dragPieces.js'

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
                    return true;
                }
            }
            break;

        case 'knight':
            if (colDiff + rowDiff === 3) {
                return true;
            }
            break;

        //TO DO: make sure this is not going over other pieces
        case 'rook':
            if (colDiff === 0 || rowDiff === 0) {
                return true;
            }
        case 'bishop':
            if (colDiff === rowDiff) {
                return true;
            }
            break;

        case 'queen':
            if ((colDiff === 0 || rowDiff === 0) || (colDiff === rowDiff) || (colDiff < 2 && rowDiff < 2)) {
                return true;
            }

        case 'king':
            if (colDiff < 2 && rowDiff < 2) {
                return true;
            } else if (colDiff === 2 && rowDiff === 0) {
                // TO DO: Check for castling
                const isShortCastling = targetColId === startColId + 2;
                const isLongCastling = targetColId === startColId - 2;

                if (isShortCastling || isLongCastling) {
                    // TO DO: Additional checks for castling conditions (squares between clear, no previous moves, etc.)
                    // TO DO: castling logic
                    return true;
                }
            }
            break;
    }
}

export { checkIfValid }