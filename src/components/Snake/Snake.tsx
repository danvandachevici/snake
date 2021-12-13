import { useEffect, useState } from "react";
import './Snake.css';

export default function Snake() {

  const moveRight = ([l, c]: any) => [l, (c+1) % 55];
  const moveLeft = ([l, c]: any) => [l, (55 + c-1) % 55];
  const moveDown = ([l, c]: any) => [(l+1) % 40, c];
  const moveUp = ([l, c]: any) => [(40 + l-1) % 40, c];

  const pixelWidth = 10;

  let currentDirection = moveRight;

  document.addEventListener('keyup', (event) => {
    console.log('keydown');

    switch (event.code) {
      case 'ArrowDown': currentDirection = moveDown; break;
      case 'ArrowUp': currentDirection = moveUp; break;
      case 'ArrowRight': currentDirection = moveRight; break;
      case 'ArrowLeft': currentDirection = moveLeft; break;
    }
  });

  let [snake, setSnake] = useState([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);

  const moveSnake = () => {
    const snakeCopy = [...snake];
    snakeCopy.shift();
    const snakeHead = snakeCopy[snakeCopy.length - 1];
    // snakeCopy.push([
    //   snakeHead[0],
    //   (snakeHead[1]+1) % 55
    // ]);
    snakeCopy.push(currentDirection(snakeHead));

    setSnake(snakeCopy);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [snake, currentDirection]);

  const snakePos = snake.map((box, i) => {
    return (
      <div className="snake" key={`_${i}`} style={{
        position: 'absolute',
        top: `${pixelWidth * box[0] + 2}px`,
        left: `${pixelWidth * box[1] + 2}px`
      }}></div>
    )
  })

  return (
    <div>
      {snakePos};
    </div>
  )   
}