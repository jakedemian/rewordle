import React, { useEffect, useRef, useState } from "react";
import "./Tile.css";
import isLetter from "../../../../common/utils/isLetter";

const Tile = (props) => {
  const {
    isActive,
    onKeyPressed,
    values,
    setValue,
    index,
    revealCorrect,
    correctWord,
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

    let correctWordCopy = correctWord.toUpperCase();
    const guessedLetter = values[index].toUpperCase();
    const correctLetter = correctWordCopy[index];

    const guessedWord = values.reduce((acc, current) => {
      acc += current;
      return acc;
    }, "");
    let slicedGuessWord = guessedWord.slice(0, index);

    if (guessedLetter === correctLetter) {
      return "tile--green";
    }

    if (correctWordCopy.includes(guessedLetter)) {
      // we found at least one match

      let occuranceCount = (
        correctWordCopy.match(new RegExp(guessedLetter, "g")) || []
      ).length;

      //get number of green occurances, subtract from total
      for (let i = 0; i < guessedWord.length; i++) {
        const _guessedLetter = values[i];
        const correctLetter = correctWordCopy[i];

        // removed correct letters from the sliced guess word, we dont care,
        // about them anymore for calculating yellow tiles
        if (
          _guessedLetter === correctLetter &&
          _guessedLetter === guessedLetter
        ) {
          occuranceCount -= 1;

          if (i + 1 >= slicedGuessWord.length) {
            slicedGuessWord = slicedGuessWord.slice(0, i) + " ";
          } else {
            slicedGuessWord =
              slicedGuessWord.slice(0, i) + " " + slicedGuessWord.slice(i + 1);
          }
        }
      }

      //get yellow occurances BEFORE this one in the guessed word
      let yellowCount = (
        slicedGuessWord.match(new RegExp(guessedLetter, "g")) || []
      ).length;
      occuranceCount -= yellowCount;

      if (occuranceCount > 0) {
        return "tile--yellow";
      }
    }

    return null;
  };

  return (
    <div className="tile">
      <input
        ref={ref}
        className={`tile--input ${
          isActive ? "tile--input--focused" : ""
        } ${getTileColor()}`}
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
