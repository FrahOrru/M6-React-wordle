
import './letter.css';

export default function Letter({letterObj}) {
    let letterClass = 'letter ';

    switch(letterObj.state) {
      case 'correct':
        letterClass += 'green-bg';
        break;
      case 'replaceable':
        letterClass += 'yellow-bg';
        break;
      case 'wrong':
        letterClass += 'grey-bg';
        break;
      default: break;  
    }
    
    return (
      <div className={letterClass} key={letterObj.id}>
        <p>
            {letterObj.letter}
        </p>
      </div>
    );
}