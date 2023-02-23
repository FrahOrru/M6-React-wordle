import './board.css';
import Letter  from '../letter/letter';

export default function Board({board}) {
    return (
      <div className="board">
        {
            board.map((row) => {
                const rowHtml = <div className='row'> { row.map((elem) => {
                        return <Letter letterObj={elem}></Letter>
                    }) 
                }
                </div>
                return rowHtml
            })
        }
      </div>
    );
}