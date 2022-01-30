import React, { useEffect, useRef, useState } from "react";
import "./Tile.css";
import isLetter from "../../../../common/utils/isLetter";
import { getLetterColorForWord } from "../../../../common/utils/getLetterColorForWord";

const WIGGLE_TILE_DELAY = 50;

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

  const [wiggle, setWiggle] = useState(null);

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

  useEffect(() => {
    if (revealCorrect) {
      setTimeout(() => {
        setWiggle(true);
      }, index * WIGGLE_TILE_DELAY);
    }
  }, [revealCorrect]);

  const handleChange = (e) => {
    const { key } = e;
    if (isLetter(key) || key === "6") {
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

    return getLetterColorForWord(index, guessedWord, correctWordCopy);
  };

  return (
    <div className={`tile ${wiggle && "tile--wiggle"}`}>
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
