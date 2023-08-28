import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import { calculateWinner } from './utils';
import { FaRedo } from 'react-icons/fa';  // Import the redo icon from react-icons

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [showModal, setShowModal] = useState(false);

  const handleClick = (i) => {
    const newBoard = [...board];
    const winner = calculateWinner(newBoard);
    if (newBoard[i] || winner) return;
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const updatedWinner = calculateWinner(newBoard);
    const isBoardFull = !newBoard.includes(null);
    
    if (updatedWinner || isBoardFull) {
      setShowModal(true);
    }
  };

  const nextPlayer = isXNext ? 'X' : 'O';

  let status;
  const winner = calculateWinner(board);
  if (winner) {
    status = `Winner: Player ${winner}`;
  } else if (!board.includes(null)) {
    status = "It's a tie!";
  } else {
    status = `Turn: Player ${nextPlayer}`;
  }

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <h2>{status}</h2>
      <h3>Score: X - {score.X} | O - {score.O}</h3>
      <Board squares={board} onClick={handleClick} />
      <button onClick={() => setBoard(Array(9).fill(null))}>
        <FaRedo />
      </button>
      <div className="footer">@carobarreirov app</div>
      
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{status}</h2>
            <button onClick={() => {
              if (winner) {
                setScore({ ...score, [winner]: score[winner] + 1 });
              }
              setBoard(Array(9).fill(null));
              setShowModal(false);
            }}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
