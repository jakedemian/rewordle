import React, { useEffect } from "react";
import Row from "./Row";
import "./Board.css";

const Board = () => {
  useEffect(() => {
    document.addEventListener("pointerdown", (e) => {
      e.preventDefault();
    });
  }, []);

  const rows = [
    <Row isActive={true} />,
    <Row />,
    <Row />,
    <Row />,
    <Row />,
    <Row />,
    <Row />,
  ];

  return <div className="board">{rows}</div>;
};

export default Board;
