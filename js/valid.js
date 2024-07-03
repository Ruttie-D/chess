import { playerGo } from './chess.js';
import { startPositionId, draggedElement } from './dragPieces.js'

function checkIfValid(target, isCapturing) {
    const piece = draggedElement.id;

    const startColId = startPositionId.charCodeAt(0);
    const startRowId = parseInt(startPositionId[1]);
    // const targetColId = (target.getAttribute('square-id')).charCodeAt(0) || (target.parentNode.getAttribute('square-id')).charCodeAt(0);
    // const targetRowId = parseInt(target.getAttribute('square-id')[1]) || parseInt(target.parentNode.getAttribute('square-id')[1]);

    // const colDiff = Math.abs(targetColId - startColId);
    // const rowDiff = Math.abs(targetRowId - startRowId);

    // console.log((target.getAttribute('square-id')).charCodeAt(0) || (target.parentNode.getAttribute('square-id')).charCodeAt(0));

    const firstMoveRow = playerGo === 'white' ? 2 : 7;
    const forward = playerGo === 'white' ? 1 : -1;

    // console.log(`piece: ${piece}; 
    //     start column: ${startColId}; start row: ${startRowId}; 
    //     target column: ${targetColId}; target row: ${targetRowId}
    //     column difference: ${colDiff}; row difference: ${rowDiff}`);

    return true;
    /* switch (piece) {

        case 'pawn':
            if ((isCapturing && ((colDiff * forward) === forward) && ((rowDiff * forward) === forward)) ||
                (!isCapturing && colDiff === 0 && (
                    ((rowDiff * forward) === (forward * 2)) || (startRowId === firstMoveRow && (rowDiff * forward) === (forward * 2))))) {
                return true;
            }
            break;

        case 'knight':
            if (colDiff + rowDiff === 3) {
                return true;
            }
            break;


    } */
}

export { checkIfValid }