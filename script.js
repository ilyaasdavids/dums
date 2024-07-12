const board = document.getElementById('board');
const playerHand = document.getElementById('player-hand');
const drawButton = document.getElementById('draw-btn');

let playerDominos = [];

// Function to create a domino tile
function createDomino(value1, value2) {
    const domino = document.createElement('div');
    domino.classList.add('domino');
    domino.innerText = `${value1}|${value2}`;
    return domino;
}

// Function to draw a domino
function drawDomino() {
    if (playerDominos.length < 7) {
        const value1 = Math.floor(Math.random() * 7);
        const value2 = Math.floor(Math.random() * 7);
        const domino = createDomino(value1, value2);
        playerHand.appendChild(domino);
        playerDominos.push(domino);
    } else {
        alert("You can only hold 7 dominoes.");
    }
}

// Event listener for the draw button
drawButton.addEventListener('click', drawDomino);
