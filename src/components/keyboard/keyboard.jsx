import { nanoid } from "nanoid";
import Letter from "../letter/letter";
import "./keyboard.css";
import { useState } from "react";

const alphabet = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "delete",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];

export default function Keyboard({ elementClicked }) {
  const createKeyboard = () => {
    const tmp = [[], [], []];

    for (let y = 0; y <= 9; y++) {
      tmp[0].push({
        id: nanoid(),
        letter: alphabet[y],
        state: "",
      });
    }
    for (let y = 0; y <= 8; y++) {
      tmp[1].push({
        id: nanoid(),
        letter: alphabet[10 + y],
        state: "",
      });
    }

    for (let y = 0; y <= 7; y++) {
      tmp[2].push({
        id: nanoid(),
        letter: alphabet[19 + y],
        state: "",
      });
    }

    return tmp;
  };

  let [keyboard, setKeyboard] = useState(createKeyboard());

  const letterClick = (element) => {
    elementClicked(element);
  };

  return (
    <div className="keyboard">
      {keyboard.map((row, index) => {
        const rowHtml = (
          <div className="row" key={index}>
            {" "}
            {row.map((elem) => {
              return (
                <Letter
                  key={elem.id}
                  elementClicked={letterClick}
                  letterObj={elem}
                  isKeyboard={true}
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
