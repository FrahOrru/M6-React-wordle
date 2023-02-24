import "./board.css";
import Letter from "../letter/letter";
import { useEffect, useState } from "react";
import useKeypress from "../../useKeypress";
import { nanoid } from "nanoid";

const dailyWord = "parola";
const guesses = [];
let currentGuess = [];

export default function Board({ board, setBoardNewValue }) {
  const [text, setText] = useState("");

  useKeypress((key) => {
    if (key === "Backspace") {
      setText(text.substr(0, text.length - 1));
    } else if (key.match(/[a-z]/i)) {
      setText(text + key);

      addLetterToBoard(key);
    }
  });

  function addLetterToBoard(letter) {
    const tmp = [...board];
    currentGuess.push(letter);
    tmp[guesses.length][currentGuess.length - 1].letter = letter;

    if (currentGuess.length === dailyWord.length) {
      checkGuess(text + letter);
    } else {
      setBoardNewValue(tmp);
    }
  }

  function checkGuess(guess) {
    guesses.push(guess);
    const tmp = board;

    for (var i = 0; i < guess.length; i++) {
      if (dailyWord.toLowerCase().includes(guess[i].toLowerCase())) {
        tmp[guesses.length - 1][i].state = "replaceable";

        if (guess[i] === dailyWord[i]) {
          tmp[guesses.length - 1][i].state = "correct";
        }
      } else {
        tmp[guesses.length - 1][i].state = "wrong";
      }
    }
    setBoardNewValue(tmp);

    checkWin(guess);
  }

  const checkWin = (guess) => {
    if (dailyWord.toLowerCase() === guess.toLowerCase()) {
      setBoardNewValue();
    }
    cleanRow();
  };

  function cleanRow() {
    setText("");
    currentGuess = [];
  }

  return (
    <div className="board">
      {board.map((row, index) => {
        const rowHtml = (
          <div className="row" key={index}>
            {" "}
            {row.map((elem) => {
              return (
                <Letter
                  key={elem.id}
                  letterObj={elem}
                  isKeyboard={false}
                ></Letter>
              );
            })}
          </div>
        );
        return rowHtml;
      })}
    </div>
  );
}
