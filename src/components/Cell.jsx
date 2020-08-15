import React from "react";

const Cell = ({ clearState, index, state, setstate, step, setstep, winCombs }) => {
  const AiMove = () => {
    let attacked = false;
    winCombs.some(comb => {
      let countO = 0;
      comb.forEach(c => {
        if (state[c] === "O") {
          ++countO;
          if (countO === 2) {
            comb.some(c => {
              if (state[c] === null) {
                state[c] = "O";
                attacked = true;
              }
              return attacked;
            });
          }
        }
      });
      return attacked;
    });
    if (!attacked) {
      Defend();
    }
    setstate(() => {
      let newState = [...state];
      return newState;
    });
  };

  const Defend = () => {
    let position;
    let defended = false;
    if (
      (step === 1 && index === 0) ||
      (step === 1 && index === 2) ||
      (step === 1 && index === 6) ||
      (step === 1 && index === 8)
    ) {
      position = 4;
    } else if (step === 1 && index === 4) {
      let arr = [0, 2, 6, 8];
      position = arr[Math.floor(Math.random() * arr.length)];
    }
    if (step === 1 && index % 2 === 1) {
      position = 4;
    }
    if (step === 1 && state[position] === null && state[position] !== "X") {
      state[position] = "O";
    }

    winCombs.map(comb => {
      let countX = 0;
      comb.map(c => {
        if (state[c] === "X") {
          ++countX;
          if (countX === 2) {
            comb.map(c => {
              if (state[c] === null) {
                state[c] = "O";
                defended = true;
              }
              return c;
            });
          }
        }
        return defended;
      });
      return comb;
    });
    if (!defended) {
      BestMove();
    }
  };

  const BestMove = () => {
    let newArrO = [];
    let newArrX = [];
    for (var i = 0; i < winCombs.length; i++) {
      let countX = 0;
      let countO = 0;
      var comb = winCombs[i];
      for (var j = 0; j < comb.length; j++) {
        var c = comb[j];
        if (state[c] === "O") {
          countO++;
        }
        if (state[c] === "X") {
          countX++;
        }
      }
      if (countO === 1 && countX === 0) {
        newArrO = [...newArrO, ...new Set(comb)];
      }
      if (countX === 1 && countO === 0) {
        newArrX = [...newArrX, ...new Set(comb)];
      }
    }

    let ArrOf1 = [];
    let ArrOf2 = [];

    for (let o = 0; o < newArrO.length; o++) {
      let blockIndex = 0;
      let O = newArrO[o];
      for (let x = 0; x < newArrX.length; x++) {
        let X = newArrX[x];
        if (O === X) {
          ++blockIndex;
        }
      }
      if (blockIndex === 2) {
        ArrOf2 = [...ArrOf2, O];
      }
      if (blockIndex === 1) {
        ArrOf1 = [...ArrOf1, O];
      }

      if (step > 1 && ArrOf2.length === 1 && ArrOf1.length < 4 && blockIndex > 1 && state[O] === null) {
        state[O] = "O";
      } else if (step > 2 && ArrOf1.length === 2 && blockIndex < 2 && state[O] === null) {
        let position = ArrOf1[0];
        state[position] = "O";
      } else if (blockIndex === 1 && ArrOf1.length === 4 && step === 2 && state[O] === null) {
        const randomPosition = ArrOf1[Math.floor(Math.random() * ArrOf1.length)];
        state[randomPosition] = "O";
      }
    }
    if (newArrO.length === 0 && step > 3) {
      let ArrofLast = [];
      newArrX.forEach(X => {
        if (state[X] === null) {
          ArrofLast = [...ArrofLast, X];
        }
      });
      let position = ArrofLast[Math.floor(Math.random() * ArrofLast.length)];
      state[position] = "O";
    }
  };

  const handleClick = () => {
    if (!state[index]) {
      setstep(() => {
        ++step;
        AiMove();
        setTimeout(() => {
          clearState();
        }, 0);
        return step;
      });
      setstate(() => {
        state[index] = "X";
        let newState = [...state];
        return newState;
      });
    }
  };

  return (
    <div className='cell' onClick={handleClick}>
      <h1>{state[index]}</h1>
    </div>
  );
};

export default Cell;
