import Pixel from '../Pixel/Pixel';
import './Board.css';

interface BoardParamsType {
  cols: number;
  lines: number;
}

function draw(cols: number, lines: number) {
  let pixels = [];
  for (let i= 0 ; i < cols; i++) {
    for (let j = 0; j < lines; j++) {
      pixels.push(<Pixel key={`${i}_${j}`}/>);
    }
  }

  return (
    <div className="board" style={{width: 10*cols, height: 10*lines}}>
      {pixels}
    </div>
  );
}

export default function Board({cols, lines}: BoardParamsType) {
  return draw(cols, lines);
}
