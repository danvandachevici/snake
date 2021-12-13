import Pixel from '../Pixel/Pixel';
import './Board.css';

interface BoardParamsType {
  widthInPixels?: number;
  pixelHeight?: number;
}

function draw(widthInPixels: number, pixelHeight: number) {
  let pixels = [];
  for (let i= 0 ; i < widthInPixels; i++) {
    for (let j = 0; j < pixelHeight; j++) {
      pixels.push(<Pixel key={`${i}_${j}`}/>);
    }
  }
  
  return (
    <div className="board">
      {pixels}
    </div>
  );
}

export default function Board({widthInPixels = 55, pixelHeight = 40}: BoardParamsType) {

  return draw(widthInPixels, pixelHeight);
}