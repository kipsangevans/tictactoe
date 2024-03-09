// script.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restartButton');
    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeBtn = document.querySelector('.close');
    const startButton = document.getElementById('startButton');
    const playerXInput = document.getElementById('playerX');
    const playerOInput = document.getElementById('playerO');
    let currentPlayer = 'X';
    let playerX = 'Player X';
    let playerO = 'Player O';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = false;
  
    startButton.addEventListener('click', () => {
      playerX = playerXInput.value.trim() || 'Player X';
      playerO = playerOInput.value.trim() || 'Player O';
  
      resetGame();
      modal.style.display = 'none';
      gameActive = true;
    });
  
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => {
       if (gameActive && gameBoard[index] === '') {
          gameBoard[index] = currentPlayer;
          cell.textContent = currentPlayer;
          checkWinner();
          togglePlayer();
        }
      });
    });
    
    restartButton.addEventListener('click', () => {
      resetGame();
      modal.style.display = 'none';
    });
  
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    function resetGame() {
      cells.forEach((cell) => {
        cell.textContent = '';
      });
  
      currentPlayer = 'X';
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
    }
  
    function checkWinner() {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          announceWinner();
          return;
        }
      }
  
      if (!gameBoard.includes('')) {
        announceTie();
      }
    }
  
    function announceWinner() {
      modalMessage.textContent = `${currentPlayer === 'X' ? playerX : playerO} wins!`;
      modal.style.display = 'block';
      gameActive = false;
    }
  
    function announceTie() {
      modalMessage.textContent = 'It\'s a tie!';
      modal.style.display = 'block';
      gameActive = false;
    }
  
    function togglePlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
  