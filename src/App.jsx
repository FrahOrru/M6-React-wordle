import './App.css';
import { useEffect, useState } from "react";
import useKeypress from "./useKeypress";
import Board from './components/board/board';
import { nanoid } from 'nanoid';

const dailyWord = 'parola';

function App() {
  let [board, setBoard] = useState(createBoard());

  useEffect(() => {
    
    console.log('board', board)
    
  }, [board]);

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
    // return Array(6).fill(Array(6).fill({id:  nanoid(), letter: '', state: '' }));
  }

  const setBoardNewValue = (value) => {
    console.log(value);
    if(value) {
      setBoard(value);
    } else {
      setBoard(createBoard());
    }
  }

  return (
    <div className="App">
      <h1>Wordle</h1>
      <Board board={board} setBoardNewValue={setBoardNewValue}></Board>
    </div>
  );
}



export default App;

// board cell state : 'correct' | 'wrong' | 'replaceable'