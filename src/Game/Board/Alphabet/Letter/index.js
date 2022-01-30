import React from "react";
import "./Letter.css";

const Letter = (props) => {
  return (
    <div className="letter">
      <div>{props.letter}</div>
    </div>
  );
};

export default Letter;
