import React, { useState } from 'react';
import Board from './Board';

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  const handleClick = i => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current.squares];

    if (calculateWinner(squares).winner || squares[i]) return;
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...historyPoint, { squares }]);
    setStepNumber(historyPoint.length);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(squares).winner;
    if (winner) {
      winner === "X" ? setXScore(xScore + 1) : setOScore(oScore + 1);
    }
  };

  const jumpTo = step => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const reset = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const historyPoint = history[stepNumber];
  const winnerInfo = calculateWinner(historyPoint.squares);
  const winner = winnerInfo.winner;

  const moves = history.map((step, move) => {
    const destination = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{destination}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={historyPoint.squares}
          onClick={handleClick}
          winningSquares={winnerInfo.line}
        />
      </div>
      <div className="game-info">
        <div className="score">
          <p>X: {xScore}</p>
          <p>O: {oScore}</p>
        </div>
        <div>{status}</div>
        <button onClick={reset}>New Game</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

const calculateWinner = squares => {
  
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: lines[i] };
        }
    }
    return { winner: null, line: null };
    
};

export default Game;