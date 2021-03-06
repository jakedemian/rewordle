import React, { useEffect, useState } from "react";
import wordList from "../wordlist";
import Board from "./Board";
import Alphabet from "./Board/Alphabet";
import "./Game.css";

const Game = () => {
  const [guessedWords, setGuessedWords] = useState([]);
  const [correctWord, setCorrectWord] = useState(null);
  const addGuessedWord = (word) => {
    setGuessedWords([...guessedWords, word]);
  };

  useEffect(() => {
    setCorrectWord(wordList[Math.floor(Math.random() * wordList.length)]);
  }, []);

  return (
    <>
      <div className="title">
        <h1>Rewordle</h1>
        <p>
          Modified clone of{" "}
          <a href="https://www.powerlanguage.co.uk/wordle/" target="_blank">
            Wordle
          </a>
        </p>
      </div>
      <div className="game">
        <Board
          addGuessedWord={addGuessedWord}
          correctWord={correctWord}
          setCorrectWord={setCorrectWord} // TODO the whole game over thing should happen up here!
        />
        <Alphabet guessedWords={guessedWords} correctWord={correctWord} />
      </div>
    </>
  );
};

export default Game;
