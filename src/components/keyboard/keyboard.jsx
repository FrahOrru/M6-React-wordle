import { useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import Letter  from '../letter/letter';
import './keyboard.css';


const alphabet = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'delete', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'enter'];

export default function Keyboard() {
    const createKeyboard = () => {
        const tmp = [[], [], []];

        for(let y = 0; y <= 9; y++) {
            tmp[0].push({
            id:  nanoid(),
            letter: alphabet[y],
            state: ''
            })
        }
        for(let y = 0; y <= 8; y++) {
            tmp[1].push({
            id:  nanoid(),
            letter: alphabet[10 + y],
            state: ''
            })
        }

        for(let y = 0; y <= 8; y++) {
            tmp[2].push({
            id:  nanoid(),
            letter: alphabet[19 + y],
            state: ''
            })
        }
  
        return tmp;
    }

    let [keyboard, setKeyboard] = useState(createKeyboard());

    const letterClick = (element) => {

    }
    return (
        <div className="keyboard">
        {
            keyboard.map((row) => {
                const rowHtml = <div className='row' key={nanoid()}> { row.map((elem) => {
                        return <Letter elementClicked={letterClick} letterObj={elem} isKeyboard={true}></Letter>
                    }) 
                }
                </div>
                return rowHtml
            })
        }
      </div>    
      )
}