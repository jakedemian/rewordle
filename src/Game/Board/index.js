import React, { useEffect, useState } from "react";
import Row from "./Row";
import "./Board.css";
import wordList from "../../wordlist";

const Board = (props) => {
  const { addGuessedWord, correctWord, setCorrectWord } = props;
  const [activeRow, setActiveRow] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  const submitWord = (word) => {
    if (!wordList.includes(word.toLowerCase())) {
      // only accept real words!
      // TODO some sort of style change
      return;
    }

    setActiveRow(activeRow + 1);
    addGuessedWord(word);

    if (word.toUpperCase() === correctWord.toUpperCase()) {
      setGameOver("win");
      return;
    }

    if (activeRow + 1 > 6) {
      setGameOver("lose");
    }
  };

  const playAgain = () => {
    window.location.reload();
  };

  return (
    <div className="board">
      {gameOver && (
        <div className="game-over">
          <p className="game-over--text">
            You {gameOver === "win" ? "won" : "lost"}
          </p>
          <button className="game-over--button" onClick={playAgain}>
            Play Again
          </button>
        </div>
      )}
      {[0, 1, 2, 3, 4, 5, 6].map((a, index) => {
        return (
          <Row
            key={index}
            isActive={activeRow === index}
            submitWord={submitWord}
            revealCorrect={activeRow > index}
            correctWord={correctWord}
          />
        );
      })}
    </div>
  );
};

export default Board;
