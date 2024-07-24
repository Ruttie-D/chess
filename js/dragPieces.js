import { changePlayer, playerGo, playerDisplay } from './chess.js'
import { checkIfValid, isChecked } from './valid.js';

let startPositionId;
let draggedElement;

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square-id');
    draggedElement = e.target;
    // console.log(draggedElement);
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

    const kings = document.querySelectorAll('#king');
    const opponentPlayerKing = Array.from(kings).find(king => king.firstChild.classList.contains(opponent)).parentNode.getAttribute('square-id');
    let checked = isChecked(opponentPlayerKing, opponent);

    if (correctGo) {
        console.log(`is checked: ${checked}`);

        if (valid) {
            if (!checked) {
                if (takenByOpponent) {
                    e.target.parentNode.append(draggedElement);
                    e.target.remove();
                    changePlayer();
                } else {
                    e.target.append(draggedElement);
                    changePlayer();
                }
            }
        }

        checked = isChecked(opponentPlayerKing, opponent);
        console.log(`is checked: ${checked}`);

        if (checked) {
            playerDisplay.textContent = `${playerGo} check`;
        }

        if (taken) {
            return;
        }
    }
}

export { dragStart, dragOver, dragDrop, startPositionId, draggedElement };