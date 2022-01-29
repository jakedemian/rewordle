import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import "./Row.css";
import isLetter from "../../../common/utils/isLetter";

const Row = (props) => {
  const { isActive } = props;
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

    if (isActive && !window.onkeydown) {
      // FIXME I think the big issue i've been having is that since this is calling
      // onRowKeyPressed inside a window.on function, it is outside the React
      // scope.  you can see this by the fact that values is always empty!!
      // it also explains why my activeTile was always 0 inside this function!
      // i need to remove this and do it in a reacty way
      window.onkeydown = (e) => {
        onRowKeyPressed(e);
      };
    }
  }, [isActive]);

  const tryIncrement = () => {
    if (activeTile < numberOfTiles - 1) {
      setActiveTile(activeTile + 1);
    }
  };

  const tryDecrement = () => {
    if (activeTile > 0) {
      setActiveTile(activeTile - 1);
      updateValues(activeTile, "");
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
      // if (isRowFilled()) {
      //   console.log("submitting word!!!");
      // }
    }
  };

  const isRowFilled = () => {
    const copy = [...values];

    console.log("values", copy);
    return values.every((v) => {
      console.log("value is", v);
      return !!v;
    });
  };

  const updateValues = (index, newValue) => {
    const copy = [...values];
    copy[index] = newValue;
    setValues(copy);
  };

  return (
    <div className="row">
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
          />
        );
      })}
    </div>
  );
};

export default Row;
