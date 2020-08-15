import React, { useState } from "react";
import Cell from "./Cell";

function Board() {
  const [state, setstate] = useState(Array(9).fill(null));
  const [step, setstep] = useState(0);
  const winCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const clearState = () => {
    if (state.every(val => val !== null)) {
      alert("Tie");
      setstate(() => {
        let newState = Array(9).fill(null);
        return newState;
      });
      setstep(0);
    }

    winCombs.forEach(comb => {
      let countO = 0;
      comb.forEach(c => {
        if (state[c] === "O") {
          ++countO;
          if (countO === 3) {
            alert("You Lose");
            setstate(() => {
              let newState = Array(9).fill(null);
              return newState;
            });
            setstep(0);
          }
        }
      });
    });
  };

  return (
    <div className='board'>
      {state.map((cell, index) => (
        <Cell
          key={index}
          index={index}
          state={state}
          setstate={setstate}
          step={step}
          setstep={setstep}
          winCombs={winCombs}
          clearState={clearState}
        />
      ))}
    </div>
  );
}

export default Board;
