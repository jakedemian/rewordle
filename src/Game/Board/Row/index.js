import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import "./Row.css";
import isLetter from "../../../common/utils/isLetter";

const Row = (props) => {
  const { isActive, submitWord, revealCorrect, correctWord, incorrectGuess } =
    props;
  const [activeTile, setActiveTile] = useState(null);
  const [values, setValues] = useState(["", "", "", "", "", ""]);

  const numberOfTiles = 6;

  useEffect(() => {
    setValues(["", "", "", "", "", ""]);
  }, []);

  useEffect(() => {
    if (isActive) {
      setActiveTile(0);
    } else {
      setActiveTile(null);
    }
  }, [isActive]);

  const tryIncrement = () => {
    if (activeTile < numberOfTiles - 1) {
      setActiveTile(activeTile + 1);
    }
  };

  const tryDecrement = () => {
    if (activeTile > 0) {
      if (activeTile === numberOfTiles - 1 && !!values[numberOfTiles - 1]) {
        updateValues(activeTile, "");
      } else {
        updateValues(activeTile - 1, "");
        setActiveTile(activeTile - 1);
      }
    } else if (activeTile === 0) {
      updateValues(activeTile, "");
    }
  };

  const onKeyPressed = (key) => {
    if (!isActive) {
      return;
    }

    if (isLetter(key)) {
      tryIncrement();
    } else if (key === "Backspace") {
      tryDecrement();
    }
  };

  const onRowKeyPressed = (e) => {
    if (!isActive) {
      return;
    }

    const { key } = e;
    if (key !== "Backspace" && key !== "Enter") {
      return;
    }

    if (key === "Backspace") {
      tryDecrement();
    } else if (key === "Enter") {
      if (isRowFilled()) {
        submitWord(getGuessedWord());
      }
    }
  };

  const getGuessedWord = () => {
    return values.reduce((acc, current) => {
      acc += current;
      return acc;
    }, "");
  };

  const isRowFilled = () => {
    return values.every((v) => {
      return !!v;
    });
  };

  const updateValues = (index, newValue) => {
    const copy = [...values];
    copy[index] = newValue;
    setValues(copy);
  };

  return (
    <div className={`row`} onKeyDown={onRowKeyPressed}>
      {[0, 1, 2, 3, 4, 5].map((element, index) => {
        return (
          <Tile
            onKeyPressed={onKeyPressed}
            isActive={index === activeTile}
            key={index}
            index={index}
            values={values}
            setValue={(newValue) => {
              updateValues(index, newValue);
            }}
            revealCorrect={revealCorrect}
            correctWord={correctWord}
            incorrectGuess={isActive && incorrectGuess}
          />
        );
      })}
    </div>
  );
};

export default Row;
