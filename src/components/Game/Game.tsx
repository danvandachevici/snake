import { useEffect, useState } from "react";
import MouseType from "../../types/mouse.type";
import TargetInterface from "../../types/target.interface";
import Board from "../Board/Board";
import Controls from "../Controls/Controls";
import Mouse from "../Mouse/Mouse";
import Snake from "../Snake/Snake";

export default function Game() {  
  
  const [gameConfig, setGameConfig] = useState({
    intervalMs: 200,
    boardLines: 20,
    boardCols: 35
  });
  const m1 = new MouseType(
    Math.floor(Math.random()*gameConfig.boardLines),
    Math.floor(Math.random()*gameConfig.boardCols)
  );
    
  const [targets, setTargets] = useState<TargetInterface[]>([m1]);

  const spawner = () => {
    const shouldRun = Math.random() > .5;
    if (!shouldRun) return;

    targets.push(new MouseType (
      Math.floor(Math.random()*gameConfig.boardLines),
      Math.floor(Math.random()*gameConfig.boardCols)
    ))
  }

  const handleTouch = function(idx: number) {
    const targetsCopy = [...targets];
    targetsCopy.splice(idx, 1);
    setTargets(targetsCopy);
  }

  const targetElements = targets.map(
    t => <Mouse key={`${t.line}-${t.col}`} position={{line: t.line, col: t.col}}/>
  );

  useEffect(() => {
    setInterval(spawner, 2000);
  }, [targets])

  const resetGame = () => {
    console.log('Damn it!');
  }

  return (
    <>
      <Board cols={gameConfig.boardCols} lines={gameConfig.boardLines}/>
      <Snake 
        cols={gameConfig.boardCols}
        lines={gameConfig.boardLines}
        targets={targets}
        intervalMs={gameConfig.intervalMs}
        onTargetTouch={handleTouch}
      />
      {targetElements}
      <Controls values={gameConfig} setValues={setGameConfig} onGameReset={() => {resetGame()}} />
    </>
  );
}
