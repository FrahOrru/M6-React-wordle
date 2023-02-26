import "./App.css";
import { useEffect, useState } from "react";
import Board from "./components/board/board";
import Keyboard from "./components/keyboard/keyboard";
import { nanoid } from "nanoid";
import {
  Modal,
  ModalContent,
  ModalClosure,
  ModalHeader,
} from "./components/styled/popup";
import { Loader, LoaderLV2 } from "./components/styled/loader";
let dailyWord = "";

function App() {
  const [board, setBoard] = useState([]);
  const [winModalStatus, setModalStatus] = useState(false);
  const [gameOverModalStatus, setGameOverModalStatus] = useState(false);
  const [virtualPressLetter, setVirtualPressLetter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?length=6")
      .then((res) => res.json())
      .then((result) => {
        dailyWord = result[0];
        setBoard(createBoard());
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  window.onclick = function (event) {
    if (winModalStatus) {
      setModalStatus(false);
      setBoard(createBoard());
    } else if (gameOverModalStatus) {
      setGameOverModalStatus(false);
      setBoard(createBoard());
    }
  };

  const addKeyboardLetter = (elem) => {
    setVirtualPressLetter(elem.letter);
  };

  const gameOver = () => {
    setGameOverModalStatus(true);
  };

  return (
    <div className="App">
      <h1>Wordle</h1>

      <Loader className={isLoading ? "display-block" : "display-none"}>
        <LoaderLV2></LoaderLV2>
      </Loader>

      <Modal
        id="myModal"
        className={winModalStatus ? "display-block" : "display-none"}
      >
        <ModalContent>
          <ModalClosure className="close">&times;</ModalClosure>
          <ModalHeader>
            <h1>Congratulation</h1>
          </ModalHeader>
          <p>
            you guessed the word, today's word was:{" "}
            <span className="dailyWord">{dailyWord}</span>
          </p>
        </ModalContent>
      </Modal>

      <Modal
        id="myModal"
        className={gameOverModalStatus ? "display-block" : "display-none"}
      >
        <ModalContent>
          <ModalClosure className="close">&times;</ModalClosure>
          <ModalHeader className="game-over">
            <h1>Game Over</h1>
          </ModalHeader>
          <p>
            I'm sorry but you lost, today's word was:{" "}
            <span className="dailyWord">{dailyWord}</span>
          </p>
        </ModalContent>
      </Modal>

      <Board
        dailyWord={dailyWord}
        board={board}
        setBoardNewValue={setBoardNewValue}
        virtualKeyPress={virtualPressLetter}
        gameOver={gameOver}
      ></Board>

      <div className={isLoading ? "display-none" : "display-block"}>
        <Keyboard elementClicked={addKeyboardLetter}></Keyboard>
      </div>
    </div>
  );
}

export default App;

// board cell state : 'correct' | 'wrong' | 'replaceable'
