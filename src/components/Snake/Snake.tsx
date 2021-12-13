import { useEffect, useState } from "react";
import TargetInterface from "../../types/target.interface";
import './Snake.css';

const equals = (a: any, b: any) =>
  a.length === b.length &&
  a.every((v: any, i: any) => v === b[i]);

let movesQueue: any = [];

interface SnakeParamsType {
  cols: number;
  lines: number;
  targets: TargetInterface[];
  onTargetTouch: any;
}

export default function Snake({cols, lines, targets, onTargetTouch}: SnakeParamsType) {

  const moveRight = [0, 1];
  const moveLeft = [0, -1];
  const moveDown = [1, 0];
  const moveUp = [-1, 0];

  const pixelWidth = 10;

  let [currentDirection, setCurrentDirection] = useState(moveRight);

  const keyPressHandler = (ev: any) => {    
    switch (ev.code) {
      case 'ArrowDown': !equals(currentDirection, moveUp) && movesQueue.push(moveDown); break;
      case 'ArrowUp': !equals(currentDirection, moveDown) && movesQueue.push(moveUp); break;
      case 'ArrowRight': !equals(currentDirection, moveLeft) && movesQueue.push(moveRight); break;
      case 'ArrowLeft': !equals(currentDirection, moveRight) && movesQueue.push(moveLeft); break;
    }
  }
  let [snake, setSnake] = useState([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);
  
  const moveSnake = () => {
    const snakeCopy = [...snake];
    if (!movesQueue.length) {
      snakeCopy.shift();
      const snakeHead = snakeCopy[snakeCopy.length - 1];
      const newPos = [
        (lines + snakeHead[0] + currentDirection[0]) % lines, 
        (cols + snakeHead[1] + currentDirection[1]) % cols
      ]
      snakeCopy.push(newPos);
    } else {
      const nextMove = movesQueue.shift();
      setCurrentDirection(nextMove);
      snakeCopy.shift();
      const snakeHead = snakeCopy[snakeCopy.length - 1];
      const newPos = [
        (lines + snakeHead[0] + currentDirection[0]) % lines, 
        (cols + snakeHead[1] + currentDirection[1]) % cols
      ]
      snakeCopy.push(newPos);
    }
    const snakeHead = snake[snake.length-1];
    targets.forEach((target, idx) => {
      if (target.col === snakeHead[1] && 
        target.line === snakeHead[0]
      ) {
        onTargetTouch(idx);
        const newTail = [
          snakeCopy[0][0] - currentDirection[0],
          snakeCopy[0][1] - currentDirection[1]
        ];
        snakeCopy.unshift(newTail);
      }
    });
    setSnake(snakeCopy);
  }
  useEffect(() => {
    document.addEventListener('keydown', keyPressHandler);
    const interval = setInterval(() => {
      moveSnake();
    }, 400);
    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', keyPressHandler);
    }
  }, [snake]);

  
  
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