"use client";
import { ISudoku } from "./ISudoku";

export interface ISudokuSolver {
  solve: (unsolvedSudoku: ISudoku) => void;
}