import "./board.css";
import Letter from "../letter/letter";
import { useEffect, useState } from "react";
import useKeypress from "../../useKeypress";

const guesses = [];
let currentGuess = [];

export default function Board({
  dailyWord,
  board,
  setBoardNewValue,
  virtualKeyPress,
  gameOver,
}) {
  const [text, setText] = useState("");
  const [allWords, setAllWords] = useState([]);
  const [isWordRecognised, setIsWordRecognised] = useState(true);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/all")
      .then((res) => res.json())
      .then((result) => {
        setAllWords(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useKeypress((key) => {
    if (key === "Backspace") {
      setText(text.substr(0, text.length - 1));
      removeFromBoard();
      setIsWordRecognised(true);
    } else if (/^[a-zA-Z]$/.test(key)) {
      if (isWordRecognised) {
        setText(text + key);

        addLetterToBoard(key);
      }
    }
  });

  useEffect(() => {
    if (virtualKeyPress) {
      setText(text + virtualKeyPress);
      addLetterToBoard(virtualKeyPress);
    }
  }, [virtualKeyPress]); // eslint-disable-line react-hooks/exhaustive-deps

  function addLetterToBoard(letter) {
    const tmp = [...board];
    currentGuess.push(letter);
    tmp[guesses.length][currentGuess.length - 1].letter = letter;

    if (currentGuess.length === dailyWord.length) {
      checkGuess(text + letter);
    }

    setBoardNewValue(tmp);
  }

  const removeFromBoard = () => {
    if (currentGuess.length > 0) {
      const tmp = [...board];

      tmp[guesses.length][currentGuess.length - 1].letter = "";

      currentGuess = currentGuess.slice(0, currentGuess.length - 1);

      setBoardNewValue(tmp);
    }
  };

  function checkGuess(guess) {
    if (!!allWords.find((word) => word === guess)) {
      guesses.push(guess);
      const tmp = [...board];

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
    } else {
      setIsWordRecognised(false);
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  }

  const checkWin = (guess) => {
    if (dailyWord.toLowerCase() === guess.toLowerCase()) {
      setBoardNewValue();
      cleanAll();
    }
    if (guesses.length === 6) {
      gameOver();
    }
    cleanRow();
  };

  function cleanRow() {
    setText("");
    currentGuess = [];
  }

  const cleanAll = () => {
    cleanRow();
    guesses.pop();
  };

  return (
    <div className="board">
      {board.map((row, index) => {
        const rowHtml = (
          <div
            className={`row shake ${isShaking ? "shake-active" : ""}`}
            key={index}
          >
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
