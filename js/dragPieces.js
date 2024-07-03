import { changePlayer, playerGo } from './chess.js'
import { checkIfValid } from './valid.js';

let startPositionId;
let draggedElement;

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square-id');
    draggedElement = e.target;
}

function dragOver(e) {
    // don't show the squares that we pass through
    e.preventDefault();
}

function dragDrop(e) {
    e.stopPropagation();
    const taken = e.target.classList.contains('piece');

    //check if the move done by the right player
    const correctGo = draggedElement.firstChild.classList.contains(playerGo);
    const opponent = playerGo === 'white' ? 'black' : 'white';
    const takenByOpponent = e.target.firstChild?.classList.contains(opponent);
    const valid = checkIfValid(e.target, takenByOpponent);
    console.log(takenByOpponent);

    if (correctGo) {

        if (valid) {
            if (takenByOpponent) {
                e.target.parentNode.append(draggedElement);
                e.target.remove();
                changePlayer();
            } else {
                e.target.append(draggedElement);
                changePlayer();
            }
        }
        if (taken) {
            return;
        }
    }
}

export { dragStart, dragOver, dragDrop, startPositionId, draggedElement };