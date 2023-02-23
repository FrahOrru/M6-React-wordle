import './App.css';
import { useEffect, useState } from "react";
import useKeypress from "./useKeypress";
import Board from './components/board/board';

const dailyWord = 'parola';
const guesses = [];
let currentGuess = [];

function App() {
  const [text, setText] = useState("");
  let [board, setBoard] = useState(createBoard());

  useEffect(() => {
    
    console.log('board', board)
    
  }, [board]);

  useKeypress((key) => {
      if (key === "Backspace") {
        setText(text.substr(0, text.length - 1));
      } else if(key.match(/[a-z]/i)){

        setText(text + key);
        
        addLetterToBoard(key);
      }
  });

  function createBoard() {
    const tmp = [];

    for(let i = 0; i <= 5; i++) {
      tmp.push([]);
      for(let y = 0; y <= dailyWord.length - 1; y++) {
        tmp[i].push({
          letter: '',
          state: ''
        })
      }
    }
  
    return tmp;
  }
  
  function addLetterToBoard(letter) {
    const tmp = board
    currentGuess.push(letter);
    tmp[guesses.length][currentGuess.length - 1].letter = letter;
  
    if(currentGuess.length === dailyWord.length) {
      console.log('text', text);
      console.log('letter', letter)
      checkGuess(text + letter);
    }

    setBoard(tmp);
  }

  function checkGuess(guess) {
    guesses.push(guess);
    const tmp = board;
    
    for (var i = 0; i < guess.length; i++) {
      if(dailyWord.toLowerCase().includes(guess[i].toLowerCase())){
        tmp[guesses.length - 1][i].state = 'replaceable';
        
        if(guess[i] === dailyWord[i]) {
          tmp[guesses.length - 1][i].state = 'correct';
        }
      } else {
        tmp[guesses.length - 1][i].state = 'wrong';
      }
   }
   console.log(board)
   setBoard(tmp);

   checkWin(guess);
  }

  const checkWin = (guess) => {
    if(dailyWord.toLowerCase() === guess.toLowerCase()) {
      console.log('hai vinto merdaaaaaaaa');
      setBoard(createBoard())
    }
    cleanRow();
  }

  function cleanRow() {
    setText('');
    currentGuess = [];
  }

  return (
    <div className="App">
      <h1>Wordle</h1>
      <Board board={board}></Board>
    </div>
  );
}



export default App;

// board cell state : 'correct' | 'wrong' | 'replaceable'