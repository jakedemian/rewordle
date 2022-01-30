import React, { useEffect, useState } from "react";
import Colors from "../../../../common/consts/Colors";
import { getLetterColorForGuessedWords } from "../../../../common/utils/getLetterColorForWord";
import "./Letter.css";

const Letter = (props) => {
  const { letter, guessedWords, correctWord } = props;
  const [letterColor, setLetterColor] = useState(null);

  const cssColorMap = {
    [Colors.GREEN]: "letter--green",
    [Colors.YELLOW]: "letter--yellow",
    [Colors.GRAY]: "letter--gray",
  };

  useEffect(() => {
    setLetterColor(
      getLetterColorForGuessedWords(letter, guessedWords, correctWord)
    );
  }, [guessedWords]);

  return (
    <div className={`letter ${letterColor ? cssColorMap[letterColor] : ""}`}>
      <div>{letter}</div>
    </div>
  );
};

export default Letter;
