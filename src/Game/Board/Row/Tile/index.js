import React, { useEffect, useRef, useState } from "react";
import "./Tile.css";
import isLetter from "../../../../common/utils/isLetter";
import { getLetterColorForWord } from "../../../../common/utils/getLetterColorForWord";

const Tile = (props) => {
  const {
    isActive,
    onKeyPressed,
    values,
    setValue,
    index,
    revealCorrect,
    correctWord,
    incorrectGuess,
  } = props;
  const ref = useRef(null);
  const value = values[index];

  useEffect(() => {
    if (isActive) {
      setTimeout(() => ref.current.focus(), 1);
    } else {
      setTimeout(() => ref.current.blur(), 1);
    }
  }, [isActive]);

  useEffect(() => {
    if (ref.current.focused && !isActive) {
      setTimeout(() => ref.current.blur(), 1);
    }
  }, [ref]);

  const handleChange = (e) => {
    const { key } = e;
    if (isLetter(key)) {
      setValue(key.toUpperCase());
    }

    if (key === "Tab") {
      e.preventDefault();
    }

    onKeyPressed(key);
  };

  const getTileColor = () => {
    if (!revealCorrect || !values) {
      return null;
    }

    const guessedLetter = values[index].toUpperCase();
    let correctWordCopy = correctWord.toUpperCase();
    const guessedWord = values.reduce((acc, current) => {
      acc += current;
      return acc;
    }, "");

    //debugger;
    return getLetterColorForWord(index, guessedWord, correctWordCopy);
  };

  return (
    <div className="tile">
      <input
        ref={ref}
        className={`tile--input ${
          isActive ? "tile--input--focused" : ""
        } ${getTileColor()} ${incorrectGuess && "color--incorrect"}`}
        type="text"
        value={value}
        onKeyDown={handleChange}
        onChange={() => {}}
        onMouseDown={(e) => e.preventDefault()}
        onBlur={(e) => {
          if (isActive) {
            e.preventDefault();
          }
        }}
      />
    </div>
  );
};

export default Tile;
