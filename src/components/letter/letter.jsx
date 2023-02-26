import "./letter.css";

export default function Letter({ letterObj, isKeyboard, elementClicked }) {
  let letterClass = "letter ";

  switch (letterObj.state) {
    case "correct":
      letterClass += "green-bg ";
      break;
    case "replaceable":
      letterClass += "yellow-bg ";
      break;
    case "wrong":
      letterClass += "grey-bg ";
      break;
    default:
      break;
  }

  switch (letterObj.letter) {
    case "enter":
    case "delete":
      letterClass += "special-letter ";
      break;
    default:
      break;
  }

  if (isKeyboard) {
    letterClass += "clickable ";
  }

  const onLetterClicked = () => {
    if (isKeyboard) {
      elementClicked(letterObj);
    }
  };

  return (
    <div className={letterClass} onClick={onLetterClicked}>
      <p>{letterObj.letter}</p>
    </div>
  );
}
