import React, { useEffect, useState } from "react";
import Row from "./Row";
import "./Board.css";
import wordList from "../../wordlist";

const GAMEOVER_WIN = "win";
const GAMEOVER_LOSS = "lose";

const Board = (props) => {
  const { addGuessedWord, correctWord, setCorrectWord } = props;
  const [activeRow, setActiveRow] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  const submitWord = (word) => {
    if (!wordList.includes(word.toLowerCase())) {
      // TODO some sort of style change
      return;
    }

    setActiveRow(activeRow + 1);
    addGuessedWord(word);

    if (word.toUpperCase() === correctWord.toUpperCase()) {
      setGameOver(GAMEOVER_WIN);
      return;
    }

    if (activeRow + 1 > 6) {
      setGameOver(GAMEOVER_LOSS);
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
            You {gameOver === GAMEOVER_WIN ? "won :)" : "lost :("}
          </p>
          {gameOver === GAMEOVER_LOSS && (
            <p className="game-over--word-reveal">{`The word was '${correctWord.toUpperCase()}'`}</p>
          )}
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
