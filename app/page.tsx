"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Sudoku } from "../app/SudokuSrc/Sudoku";
import { QuickSolver } from "./SudokuSrc/QuickSolver";
import { useState } from "react";
import { Cell } from "./SudokuSrc/Cell";
import { BruteForceSolver } from "./SudokuSrc/BruteForceSolver";
import { BruteForceNew } from "./SudokuSrc/BruteForceNew";
import "./globals.css";
import "./page.module.css";
import { hydrateRoot } from 'react-dom/client';
//import parse from 'html-react-parser'

export default function Home() {
  console.log("Home called ");

  let [countIteration, setLocalCount] = useState(1);
  let [solveTime, setSolveTime] = useState(0);
  let [gridSize, setGridSize] = useState(3);
  let [solveStrategyType, setSolveStrategyType] = useState(2);
  let [localSudoku, setLocalSudoku] = useState(new Sudoku(gridSize));
  //localSudoku.setFixedCellValue(1, 1, 3); 
//let localSudoku=new Sudoku(gridSize);
//localSudoku.copy();
  function setGridStyleSize(size: number) {
    //document.documentElement.style.setProperty('--grid-size', (size*size).toString());
  }

 
  const handleReset = () => {
    setLocalSudoku(new Sudoku(gridSize));
    setGridStyleSize(gridSize);
  }

  const handleChangeGridSize = (gridSize: number) => {
    setGridSize(gridSize);
    setLocalSudoku(new Sudoku(gridSize));
    setGridStyleSize(gridSize);
  }

  const handleChangeSolver = (solverType: number) => {
//localSudoku=new Sudoku(gridSize);
    if (solverType === 1) {
      localSudoku.solveStrategy = new BruteForceNew();
      setSolveStrategyType(1);
    } else if (solverType === 2) {
      localSudoku.solveStrategy = new QuickSolver();
      setSolveStrategyType(2);
    } else {
      localSudoku.solveStrategy = new QuickSolver();
      setSolveStrategyType(2);
    }
    
    //setLocalSudoku(localSudoku.copy() as Sudoku);

  }

  const handleCellValue = (row: number, col: number, val:number) => {
    //if (/^[1-9]?$/.test(value.toString())) { 
    console.log("row,col,value",row,col,val);
    localSudoku.setFixedCellValue(row+1, col+1, val);
    setLocalSudoku(localSudoku.copy() as Sudoku);
    //} 
  };

  const handleSolve = () => {

    if (!localSudoku.solved) {
      if (solveStrategyType === 1) {
        localSudoku.solveStrategy = new BruteForceNew();
        setSolveStrategyType(1);
      } else if (solveStrategyType === 2) {
        localSudoku.solveStrategy = new QuickSolver();
        setSolveStrategyType(2);
      } else {
        localSudoku.solveStrategy = new QuickSolver();
        setSolveStrategyType(2);
      }

      const startTime = performance.now();
      //localSudoku.setFixedCellValue(1, 1, 3); 

      localSudoku.solve();
      //setLocalSudoku(localSudoku.copy() as Sudoku);

      const endTime = performance.now();
      solveTime = endTime - startTime;
      setSolveTime(solveTime);
    }

  }

  return (
    <div >
      <div >


        <table  className="outerSudoku" >
          <tbody >
            {localSudoku.rows.map((row, rIndex) => (
              <tr key={rIndex} >
                {row.Cells.map((cell, cIndex) => (
                  <td key={cIndex} className="cell">
                    <b>{cell.Value}</b>
         

                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>


        <button id="btnSolve" onClick={handleSolve} className="solveButton">
          Solve15
        </button>  &nbsp;
        <button id="btnReset" onClick={handleReset} className="resetButton">
          Reset
        </button>
        Solve time: {solveTime} milliseconds
      </div>
      <p />
      <p />
      <div>
        <label>
          <input
            type="radio"
            name="gridSizeInput"
            value="2"
            checked={localSudoku.gridSize === 2}
            onChange={() => handleChangeGridSize(2)}
          />
          2x2
        </label>
        <label>
          <input
          type="radio"
            name="gridSizeInput"
            value="3"
            checked={localSudoku.gridSize === 3}
            onChange={() => handleChangeGridSize(3)}
          />
          3x3
        </label>
        <label>
          <input
            type="radio"
            name="gridSizeInput"
            value="4"
            checked={localSudoku.gridSize === 4}
            onChange={() => handleChangeGridSize(4)}
          />
          4x4
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            name="SolveStratInput"
            value="1"
            checked={solveStrategyType === 1}
            onChange={() => handleChangeSolver(1)}
          />
          Brute Force Solver 11
        </label>
        <label>
          <input
            type="radio"
            name="SolveStratInput"
            value="2"
            checked={solveStrategyType === 2}
            onChange={() => handleChangeSolver(2)}
          />
          Quick Solver 11
        </label>
      </div>
    </div>
  );
}