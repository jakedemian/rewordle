import React, { useEffect, useState } from "react";
import { getLetterColorForGuessedWords } from "../../../../common/utils/getLetterColorForWord";
import "./Letter.css";

const Letter = (props) => {
  const { letter, guessedWords, correctWord } = props;
  const [letterColor, setLetterColor] = useState(null);

  useEffect(() => {
    console.log("setting color for letter");
    setLetterColor(
      getLetterColorForGuessedWords(letter, guessedWords, correctWord)
    );
  }, [guessedWords]);

  return (
    <div className={`letter ${letterColor}`}>
      <div>{letter}</div>
    </div>
  );
};

export default Letter;
