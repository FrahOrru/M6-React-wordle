import './App.css';
import { useEffect, useState } from "react";
import Board from './components/board/board';
import Keyboard from './components/keyboard/keyboard';
import { nanoid } from 'nanoid';

const dailyWord = 'parola';

function App() {
  let [board, setBoard] = useState(createBoard());

  function createBoard() {
    const tmp = [];

    for(let i = 0; i <= 5; i++) {
      tmp.push([]);
      for(let y = 0; y <= dailyWord.length - 1; y++) {
        tmp[i].push({
          id:  nanoid(),
          letter: '',
          state: ''
        })
      }
    }
  
    return tmp;
  }

  const setBoardNewValue = (value) => {
    console.log(value);
    if(value) {
      setBoard(value);
    } else {
      console.log('si')
      setBoard(createBoard());
    }
  }

  return (
    <div className="App">
      <h1>Wordle</h1>
      <Board board={board} setBoardNewValue={setBoardNewValue}></Board>
      <Keyboard></Keyboard>
    </div>
  );
}



export default App;

// board cell state : 'correct' | 'wrong' | 'replaceable'