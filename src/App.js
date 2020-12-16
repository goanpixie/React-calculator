import React, { useState, useEffect } from "react";
import "./style.css";

export default function App() {
  const [prevValue, setPrevValue] = useState(null);
  const [nextValue, setNextValue] = useState("0");
  const [op, setOp] = useState(null);

  useEffect(() => {}, [op, prevValue, nextValue]);

  const clear = () => {
    console.log("I am here");
    setNextValue("0");
    setPrevValue(0);
  };

  const handleNum = num => {
    console.log("I am handling num", num);
    setNextValue(nextValue === "0" ? String(num) : nextValue + num);
    console.log("nextValue", nextValue);
  };

  const CalculatorOperation = {
    "+": (firstNum, secondNum) => firstNum + secondNum,
    "-": (firstNum, secondNum) => firstNum - secondNum,
    "*": (firstNum, secondNum) => firstNum * secondNum,
    "/": (firstNum, secondNum) => firstNum / secondNum,
    "=": (firstNum, secondNum) => secondNum
  };

  function isNumeric(num) {
    return !isNaN(num);
  }

  const handleOperation = e => {
    let value = e.target.value;
    console.log(value);
    if (isNumeric(value)) {
      handleNum(parseInt(value, 10));
    } else if (value in CalculatorOperation) {
      if (op === null) {
        setOp(value);
        setPrevValue(nextValue);
        setNextValue("");
      }
      if (op) {
        setOp(value);
      }
      if (op && prevValue && nextValue) {
        performCalculation();
      }
    } else if (value == "AC") {
      clear();
    }
  };

  const performCalculation = () => {
    let temp = CalculatorOperation[op](
      parseFloat(prevValue),
      parseFloat(nextValue)
    );
    setOp(null);
    setPrevValue(null);
    setNextValue(String(temp));
  };

  return (
    <div>
      <h1>Calculator</h1>

      <div>{nextValue}</div>
      <button value="1" onClick={handleOperation}>
        1
      </button>
      <button value="2" onClick={handleOperation}>
        2
      </button>
      <button value="3" onClick={handleOperation}>
        3
      </button>
      <button value="4" onClick={handleOperation}>
        4
      </button>
      <button value="5" onClick={handleOperation}>
        5
      </button>
      <button value="6" onClick={handleOperation}>
        6
      </button>
      <button value="7" onClick={handleOperation}>
        7
      </button>
      <button value="8" onClick={handleOperation}>
        8
      </button>
      <button value="9" onClick={handleOperation}>
        9
      </button>
      <button value="0" onClick={handleOperation}>
        0
      </button>
      <br />
      <button value="+" onClick={handleOperation}>
        +
      </button>
      <button value="-" onClick={handleOperation}>
        -
      </button>
      <button value="/" onClick={handleOperation}>
        /
      </button>
      <button value="*" onClick={handleOperation}>
        *
      </button>
      <br />
      <button value="=" onClick={handleOperation}>
        =
      </button>
      <button value="AC" onClick={handleOperation}>
        AC
      </button>
    </div>
  );
}
