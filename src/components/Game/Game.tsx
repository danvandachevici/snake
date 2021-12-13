import { useEffect, useState } from "react";
import MouseType from "../../types/mouse.type";
import TargetInterface from "../../types/target.interface";
import Board from "../Board/Board";
import Mouse from "../Mouse/Mouse";
import Snake from "../Snake/Snake";

export default function Game() {

  const boardLines = 20;
  const boardCols = 35;
  
  
  const m1 = new MouseType(
    Math.floor(Math.random()*boardLines),
    Math.floor(Math.random()*boardCols)
  );
    
  const [targets, setTargets] = useState<TargetInterface[]>([m1]);

  const handleTouch = function(x: TargetInterface, idx: number) {
    console.log('Touched', x);
    const targetsCopy = [...targets];
    targetsCopy.splice(idx, 1, new MouseType(
      Math.floor(Math.random()*boardLines),
      Math.floor(Math.random()*boardCols)
    ));
    setTargets(targetsCopy);
  }

  const targetElements = targets.map(t => <Mouse key={`${t.line}-${t.col}`} position={{line: t.line, col: t.col}}/>);

  return (
    <>
      <Board cols={boardCols} lines={boardLines}/>
      <Snake 
        cols={boardCols}
        lines={boardLines}
        targets={targets}
        onTargetTouch={handleTouch}
      />
      {targetElements}
    </>
  );
}