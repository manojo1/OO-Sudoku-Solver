"use client";
import { Cell } from './Cell';
import { CellContainer } from './CellContainer';
import { ISudokuSolver } from './ISudokuSolver';

export interface ISudoku {
    rows: CellContainer[];
    columns: CellContainer[];
    squares: CellContainer[];
    allCells: Cell[];
    gridSize: number;
    solved: boolean;
    solveStrategyBase?: ISudokuSolver; // Optional setter
    setFixedCellValue: (rowNum: number, colNum: number, value: number) => void;
    solve: () => void;
  }