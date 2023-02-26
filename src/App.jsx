import "./App.css";
import { useEffect, useState } from "react";
import Board from "./components/board/board";
import Keyboard from "./components/keyboard/keyboard";
import { nanoid } from "nanoid";
import { Modal, ModalContent, ModalClosure } from "./components/styled/popup";
const dailyWord = "parola";

function App() {
  let [board, setBoard] = useState(createBoard());
  let [modalStatus, setModalStatus] = useState(false);
  let [virtualPressLetter, setVirtualPressLetter] = useState("");

  useEffect((board) => {}, [board]);

  function createBoard() {
    const tmp = [];

    for (let i = 0; i <= 5; i++) {
      tmp.push([]);
      for (let y = 0; y <= dailyWord.length - 1; y++) {
        tmp[i].push({
          id: nanoid(),
          letter: "",
          state: "",
        });
      }
    }

    return tmp;
  }

  const setBoardNewValue = (value) => {
    if (value) {
      setBoard(value);
    } else {
      setModalStatus(true);
    }
  };

  const closeModal = () => {
    if (modalStatus) {
      // setModalStatus(false);
      // setBoard(createBoard());
    }
  };

  window.onclick = function (event) {
    if (modalStatus) {
      setModalStatus(false);
      setBoard(createBoard());
    }
  };

  const addKeyboardLetter = (elem) => {
    console.log(elem.letter);
    setVirtualPressLetter(elem.letter);
  };

  return (
    <div className="App">
      <h1>Wordle</h1>
      <Modal
        id="myModal"
        className={modalStatus ? "display-block" : "display-none"}
      >
        <ModalContent>
          <ModalClosure className="close" onclick={closeModal()}>
            &times;
          </ModalClosure>
          <p>congratulation you guessed the word</p>
        </ModalContent>
      </Modal>

      <Board
        board={board}
        setBoardNewValue={setBoardNewValue}
        virtualKeyPress={virtualPressLetter}
      ></Board>
      <Keyboard elementClicked={addKeyboardLetter}></Keyboard>
    </div>
  );
}

export default App;

// board cell state : 'correct' | 'wrong' | 'replaceable'
