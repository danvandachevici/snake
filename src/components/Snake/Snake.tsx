import { useEffect, useState } from "react";
import TargetInterface from "../../types/target.interface";
import './Snake.css';

class Direction {
  dx: number
  dy: number
  constructor(x: number, y: number) {
    this.dx = x;
    this.dy = y;
  }
}

const equals = (a?: Direction, b?: Direction) =>
  a && b && a.dx === b.dx && a.dy === b.dy

let movesQueue: Direction[] = [];

interface SnakeParamsType {
  cols: number;
  lines: number;
  targets: TargetInterface[];
  onTargetTouch: any;
  intervalMs: number;
  pause: boolean;
}

export default function Snake({ cols, lines, intervalMs, targets, onTargetTouch, pause }: SnakeParamsType) {

  // functions to move by
  const moveRight = { dy: 0, dx: 1 };
  const moveLeft = { dy: 0, dx: -1 };
  const moveDown = { dy: 1, dx: 0 };
  const moveUp = { dy: -1, dx: 0 };

  const pixelWidth = 10;

  let [currentDirection, setCurrentDirection] = useState(moveRight);

  const keyPressHandler = (ev: any) => {
    switch (ev.code) {
      // when ArrowUp is pressed, I can only go up if I was not already going down
      // also - I cannot go up, if I'm already going up. No point in adding that 
      // to the queue
      case 'ArrowDown': !equals(movesQueue[0], moveDown) && !equals(currentDirection, moveUp) && movesQueue.push(moveDown); break;
      case 'ArrowUp': !equals(movesQueue[0], moveUp) && !equals(currentDirection, moveDown) && movesQueue.push(moveUp); break;
      case 'ArrowRight': !equals(movesQueue[0], moveRight) && !equals(currentDirection, moveLeft) && movesQueue.push(moveRight); break;
      case 'ArrowLeft': !equals(movesQueue[0], moveLeft) && !equals(currentDirection, moveRight) && movesQueue.push(moveLeft); break;
    }
  }
  // snake starts at the first line, and has length 5
  let [snake, setSnake] = useState([
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ]);

  const move1Step = (snakeCopy: any, direction: Direction) => {
    snakeCopy.shift();
    const snakeHead = snakeCopy[snakeCopy.length - 1];
    const newPos = [
      (lines + snakeHead[0] + currentDirection.dy) % lines,
      (cols + snakeHead[1] + currentDirection.dx) % cols
    ]
    snakeCopy.push(newPos);
    
  }

  const runTargetEffectOnSnake = (snakeCopy: any, targets: TargetInterface[]) => {
    const snakeHead = snakeCopy[snakeCopy.length - 1];
    targets.forEach((target, idx) => {
      if (target.col === snakeHead[1] &&
        target.line === snakeHead[0]
      ) {
        onTargetTouch(idx);
        const newTail = [
          snakeCopy[0][0] - currentDirection.dy,
          snakeCopy[0][1] - currentDirection.dx
        ];
        snakeCopy.unshift(newTail);
      }
    });
  }
  
  const moveSnake = () => {
    const snakeCopy = [...snake];
    /**
     * Move the snake
     */
    if (movesQueue.length) {
      // if there are moves in the queue, alter the current direction 
      // and go that way
      const nextMove = movesQueue.shift();
      setCurrentDirection(nextMove as Direction);
    }
    move1Step(snakeCopy, currentDirection);
    /**
     * End move the snake
     */

    runTargetEffectOnSnake(snakeCopy, targets);

    setSnake(snakeCopy);
  }
  useEffect(() => {
    document.addEventListener('keydown', keyPressHandler);
    let timeoutHandle: any;
    if (pause) {
      // do nothing
    } else {
      timeoutHandle = setTimeout(() => {
        moveSnake();
      }, intervalMs);
    }
    return () => {
      clearTimeout(timeoutHandle);
      document.removeEventListener('keydown', keyPressHandler);
    }
  }, [snake, pause]);

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
