document.addEventListener('DOMContentLoaded', function() {
  const player1Hand = document.getElementById('player1-hand');
  const player2Hand = document.getElementById('player2-hand');
  const gameBoard = document.getElementById('game-board');
  let currentPlayer = 'player1'; // Start with player 1
  let leftEndValue = null;
  let rightEndValue = null;
  let player1CardsPlayed = 0;
  let player2CardsPlayed = 0;
  let firstCardPlayed = false; 
  let player1Total = 0;
  let player2Total = 0;

  const allCards = [
    { top: 0, bottom: 0 }, { top: 0, bottom: 1 }, { top: 0, bottom: 2 }, { top: 0, bottom: 3 },
    { top: 0, bottom: 4 }, { top: 0, bottom: 5 }, { top: 0, bottom: 6 }, { top: 1, bottom: 1 },
    { top: 1, bottom: 2 }, { top: 1, bottom: 3 }, { top: 1, bottom: 4 }, { top: 1, bottom: 5 },
    { top: 1, bottom: 6 }, { top: 2, bottom: 2 }, { top: 2, bottom: 3 }, { top: 2, bottom: 4 },
    { top: 2, bottom: 5 }, { top: 2, bottom: 6 }, { top: 3, bottom: 3 }, { top: 3, bottom: 4 },
    { top: 3, bottom: 5 }, { top: 3, bottom: 6 }, { top: 4, bottom: 4 }, { top: 4, bottom: 5 },
    { top: 4, bottom: 6 }, { top: 5, bottom: 5 }, { top: 5, bottom: 6 }, { top: 6, bottom: 6 }
  ];

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function dealCards() {
    shuffle(allCards);
    for (let i = 0; i < 7; i++) {
      const card = createCardElement(allCards[i]);
      player1Hand.appendChild(card);
    }
    for (let i = 7; i < 14; i++) {
      const card = createCardElement(allCards[i]);
      player2Hand.appendChild(card);
    }
  }
    
function createCardElement(cardData) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = `${cardData.top} | ${cardData.bottom}`;
  card.dataset.top = cardData.top;
  card.dataset.bottom = cardData.bottom;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0'); // Make it focusable

  // Highlight card if playable
  highlightPlayableCard(card);

  // Add click event listener to play card
  card.addEventListener('click', handleCardClick);
  
  // Add keyboard support
  //card.addEventListener('keydown', function(event) {
  //  if (event.key === 'Enter' || event.key === ' ') {
  //    handleCardClick(event);
  //  }
  //});

  function handleCardClick(event) {
    // Allow playing the first card regardless of playability
    if (!firstCardPlayed) {
      playCard(card, currentPlayer === 'player1' ? player1Hand : player2Hand);
      firstCardPlayed = true; // Mark that the first card has been played
    } else {
      // Check if the card is highlighted for subsequent plays
      if (card.classList.contains('playable')) {
        playCard(card, currentPlayer === 'player1' ? player1Hand : player2Hand);
      } else {
        alert('Card is not playable.');
      }
    }
  }
  return card;
}

function checkWinCondition(player1Total,player2Total) {
    
    if (player1Total < player2Total) {
    alert('Player 1 wins!!');
   } else {
    alert('Player 2 wins!!');
   }
    
}

function passTurn() {
  // Switch the current player
  currentPlayer = (currentPlayer === 'player1') ? 'player2' : 'player1';

 alert("This player is knocking on the door");    
    
  // Update UI to indicate the current player
  updateCurrentPlayerDisplay();
}

function updateCurrentPlayerDisplay() {
  const player1Element = document.getElementById('player1');
  const player2Element = document.getElementById('player2');

  // Update the borders to highlight the current player
  if (currentPlayer === 'player1') {
    player1Element.style.border = '2px solid blue';
    player2Element.style.border = '1px solid #ccc';
    document.querySelector('#player1 .klop').disabled = false;  // Enable Player 1 button
    document.querySelector('#player2 .klop').disabled = true;   // Disable Player 2 button
  } else {
    player2Element.style.border = '2px solid blue';
    player1Element.style.border = '1px solid #ccc';
    document.querySelector('#player2 .klop').disabled = false;  // Enable Player 2 button
    document.querySelector('#player1 .klop').disabled = true;   // Disable Player 1 button
  }
}

// Add event listener to "KLOP!" buttons
  document.querySelectorAll('.klop').forEach(button => {
  button.addEventListener('click', passTurn);
});

// Initial display update and button states
updateCurrentPlayerDisplay();
    
function updatePlayerHands() {
  const playableCards = [...player1Hand.children, ...player2Hand.children];
  let hasPlayableCard = false;  

  playableCards.forEach(card => {
    let cardTop = parseInt(card.dataset.top, 10);
    let cardBottom = parseInt(card.dataset.bottom, 10);
    
    // Check if the card can be played
    if (cardTop === leftEndValue || cardTop === rightEndValue ||
        cardBottom === leftEndValue || cardBottom === rightEndValue) {
        hasPlayableCard = true; 
        card.classList.add('playable');

      // If the card matches the left end, switch the top and bottom values
      if (leftEndValue === cardTop) {
        card.dataset.top = cardBottom;  // Switch top and bottom
        card.dataset.bottom = cardTop;
        card.textContent = `${cardBottom} | ${cardTop}`;  // Update displayed text
      }
      // If the card matches the right end, switch the top and bottom values
      else if (leftEndValue === cardBottom) {
        card.dataset.top = cardTop;  // No switch needed here
        card.dataset.bottom = cardBottom; // No switch needed here
      }      
          
      if (rightEndValue === cardTop) {
        card.dataset.top = cardTop;  // Switch top and bottom
        card.dataset.bottom = cardBottom;
        card.textContent = `${cardBottom} | ${cardTop}`;  // Update displayed text
      }
      // If the card matches the right end, switch the top and bottom values
      else if (rightEndValue === cardBottom) {
        card.dataset.top = cardBottom;  // No switch needed here
        card.dataset.bottom = cardTop; // No switch needed here
        card.textContent = `${cardBottom} | ${cardTop}`;  // Update displayed text
      } 
        
    } else {
      card.classList.remove('playable'); // Not playable, remove clas
    }      
  
    updateCurrentPlayerDisplay();
  });
     
  if (!hasPlayableCard) {
    const player1Count = player1Hand.children.length;
    const player2Count = player2Hand.children.length;

    let player1Total = Array.from(player1Hand.children).reduce((total, card) => {
      return total + parseInt(card.dataset.top, 10) + parseInt(card.dataset.bottom, 10);
    }, 0);

    let player2Total = Array.from(player2Hand.children).reduce((total, card) => {
      return total + parseInt(card.dataset.top, 10) + parseInt(card.dataset.bottom, 10);
    }, 0);
  
    alert(`Player 1 has ${player1Count} cards left with a total value of ${player1Total}.`);
    alert(`Player 2 has ${player2Count} cards left with a total value of ${player2Total}.`);
          // Optionally, you can update the UI or trigger game-over logic here
  
      checkWinCondition(player1Total,player2Total);
  }    
    

}  
    
function playCard(card, hand) {
    // Remove card from player's hand
    hand.removeChild(card);
    
    // Determine which end of the card matches the board and update ends
    const cardTop = parseInt(card.dataset.top, 10);
    const cardBottom = parseInt(card.dataset.bottom, 10);
    if (leftEndValue === null && rightEndValue === null) {
      // First card played on the board
      leftEndValue = cardTop;
      rightEndValue = cardBottom;
      
      // Place card on the game board
      const boardTile = document.createElement('div');
      boardTile.classList.add('board-tile');
      boardTile.textContent = `${cardTop} | ${cardBottom}`;
      gameBoard.appendChild(boardTile);
    } else if (cardTop === rightEndValue) {
      // Card matches right end of the board
      rightEndValue = cardBottom;
      
      // Append card to the right end of the game board
      const boardTile = document.createElement('div');
      boardTile.classList.add('board-tile');
      boardTile.textContent = `${cardTop} | ${cardBottom}`;
      gameBoard.appendChild(boardTile);
    } else if (cardBottom === leftEndValue) {
      // Card matches left end of the board
      leftEndValue = cardTop;
      
      // Prepend card to the left end of the game board
      const boardTile = document.createElement('div');
      boardTile.classList.add('board-tile');
      boardTile.textContent = `${cardTop} | ${cardBottom}`;
      gameBoard.insertBefore(boardTile, gameBoard.firstChild);
    } else {
      console.error('Invalid move!'); // This should not happen if game rules are followed
      return;
    }
        
    // Switch players (toggle between 'player1' and 'player2')
    currentPlayer = (currentPlayer === 'player1') ? 'player2' : 'player1';

    // After playing a card, re-evaluate all cards for playability and orientation
    updatePlayerHands();
    
        // Increment the count of cards played
  //if (currentPlayer === 'player1') {
  //  player1CardsPlayed++;
  //  checkWinCondition('player1');
  //} else {
  //  player2CardsPlayed++;
  //  checkWinCondition('player2');
  //}
  }
  
    function highlightPlayableCard(card) {
    const cardTop = parseInt(card.dataset.top, 10);
    const cardBottom = parseInt(card.dataset.bottom, 10);
    
    // Check if card can be played next to the current ends of the board
    if (cardTop === leftEndValue || cardTop === rightEndValue ||
        cardBottom === leftEndValue || cardBottom === rightEndValue) {
      card.classList.add('playable');
    }
  }

  dealCards();
});
