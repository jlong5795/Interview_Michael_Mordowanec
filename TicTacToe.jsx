// Load into https://playcode.io/react

import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

function Square({ onClick, children }) {
  return (
    <div className="square" style={squareStyle} onClick={onClick}>
      {children}
    </div>
  );
}

function getBlankBoard() {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
}

function checkForWinner(boardState, playerLetter) {
  const matcher = (row) => row.every((val) => val === playerLetter);
  const horizontalWin = boardState.some(matcher);
  const verticalWin = [0, 1, 2]
    .map((rowIndex) => boardState.map((row) => row[rowIndex]))
    .some(matcher);
  const diagonalWin1 = matcher([
    boardState[0][0],
    boardState[1][1],
    boardState[2][2],
  ]);
  const diagonalWin2 = matcher([
    boardState[0][2],
    boardState[1][1],
    boardState[2][0],
  ]);

  return horizontalWin || verticalWin || diagonalWin1 || diagonalWin2;
}

function Board() {
  const [playerTurn, setPlayerTurn] = useState(0);
  const [boardState, setBoardState] = useState(getBlankBoard());
  const [winner, setWinner] = useState(undefined);

  const playerLetter = playerTurn ? "O" : "X";

  const onReset = () => {
    setBoardState(getBlankBoard());
    setPlayerTurn(0);
    setWinner(undefined);
  };
  const squareOnClick = (rowIndex, columnIndex) => {
    return (e) => {
      e.preventDefault();
      const currentSquare = boardState[rowIndex][columnIndex];
      if (currentSquare === "") {
        boardState[rowIndex][columnIndex] = playerLetter;
        if (checkForWinner(boardState, playerLetter)) {
          setWinner(playerLetter);
        }
        setBoardState(boardState);
        setPlayerTurn((playerTurn + 1) % 2);
      }
    };
  };

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{playerLetter}</span>
      </div>
      {winner && (
        <div id="winnerArea" className="winner" style={instructionsStyle}>
          Winner: <span>{winner}</span>
        </div>
      )}
      <button style={buttonStyle} onClick={onReset}>
        Reset
      </button>
      <div style={boardStyle}>
        {Array(3)
          .fill()
          .map((_, outerIndex) => {
            return (
              <div
                className="board-row"
                style={rowStyle}
                key={`row${outerIndex}`}
              >
                {Array(3)
                  .fill()
                  .map((_, innerIndex) => {
                    return (
                      <Square
                        onClick={squareOnClick(outerIndex, innerIndex)}
                        key={`row${outerIndex}column${innerIndex}`}
                      >
                        {boardState[outerIndex][innerIndex]}
                      </Square>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Game />);
