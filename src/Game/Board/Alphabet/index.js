import React, { useEffect, useState } from "react";
import Letter from "./Letter";
import "./Alphabet.css";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Alphabet = (props) => {
  const { guessedWords, correctWord } = props;
  const [alphabetArray, setAlphabetArray] = useState(null);

  useEffect(() => {
    let array = [];
    for (let i = 0; i < ALPHABET.length; i++) {
      array.push(ALPHABET[i]);
    }
    setAlphabetArray(array);
  }, []);

  return (
    <div className="alphabet">
      {alphabetArray?.map((letter, index) => {
        return (
          <Letter
            letter={letter}
            guessedWords={guessedWords}
            correctWord={correctWord}
          />
        );
      })}
    </div>
  );
};

export default Alphabet;
