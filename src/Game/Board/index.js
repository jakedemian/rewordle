import React, { useEffect, useState } from "react";
import Row from "./Row";
import "./Board.css";
import wordList from "../../wordlist";

const Board = () => {
  const [activeRow, setActiveRow] = useState(0);

  const [correctWord, setCorrectWord] = useState(
    wordList[Math.floor(Math.random() * wordList.length)]
  );
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    document.addEventListener("pointerdown", (e) => {
      e.preventDefault();
    });
  }, []);

  useEffect(() => {
    console.log(correctWord);
  }, [correctWord]);

  const submitWord = (word) => {
    setActiveRow(activeRow + 1);

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
          <p class="game-over--text">
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
