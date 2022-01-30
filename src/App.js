import logo from "./logo.svg";
import "./App.css";
import Game from "./Game";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.addEventListener("pointerdown", (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
