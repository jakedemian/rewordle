import React from "react";
import Board from "./Board";
import Alphabet from "./Board/Alphabet";
import "./Game.css";

const Game = () => {
  return (
    <div className="game">
      <Board />
      <Alphabet />
    </div>
  );
};

export default Game;
