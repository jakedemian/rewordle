import React, { useState } from "react";
import wordList from "../wordlist";
import Board from "./Board";
import Alphabet from "./Board/Alphabet";
import "./Game.css";

const Game = () => {
  const [guessedWords, setGuessedWords] = useState([]);
  const [correctWord, setCorrectWord] = useState(
    //wordList[Math.floor(Math.random() * wordList.length)]
    "should"
  );
  const addGuessedWord = (word) => {
    setGuessedWords([...guessedWords, word]);
  };

  return (
    <div className="game">
      <Board
        addGuessedWord={addGuessedWord}
        correctWord={correctWord}
        setCorrectWord={setCorrectWord} // TODO the whole game over thing should happen up here!
      />
      <Alphabet guessedWords={guessedWords} correctWord={correctWord} />
    </div>
  );
};

export default Game;
