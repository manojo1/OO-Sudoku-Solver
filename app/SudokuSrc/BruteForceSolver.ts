"use client";
import { ISudoku } from './ISudoku'; // Assuming the ISudoku interface is defined elsewhere
import { Cell } from './Cell'; // Assuming the Cell class is defined elsewhere
import { Square } from './Square';
import { AbstractSudoku } from './AbstractSudoku';
import { CellContainer } from './CellContainer';
import { AbstractSudokuSolver } from './AbstractSudokuSolver';

export class BruteForceSolver extends AbstractSudokuSolver {
   
    public solve(unSolvedSudoku: ISudoku): void {
      let cellList = new Array<Cell>();
      let flag = true;
  
      while (flag) {
        try {
          flag = false;
          this.checkRows(unSolvedSudoku);
          this.checkCols(unSolvedSudoku);
          this.checkSquares(unSolvedSudoku);
  
          if (!unSolvedSudoku.solved) {
            this.populateUnsolvedCellsCollection(unSolvedSudoku, cellList);

            this.updateSudokuGuessStack(false, unSolvedSudoku, cellList);
            flag = true;
          }
        } catch (error) {

          flag = this.populateNextSudokuInstanceFromStack(unSolvedSudoku, cellList);
        }
      }
    }
  
    checkRows(unSolvedSudoku: ISudoku) {
      this.checkContainers(unSolvedSudoku.rows);
    }
  
    checkCols(unSolvedSudoku: ISudoku) {
      this.checkContainers(unSolvedSudoku.columns);
    }
  
    checkSquares(unSolvedSudoku: ISudoku) {
      this.checkContainers(unSolvedSudoku.squares);
    }
  
    checkContainers(containers: CellContainer[]) {
      for (let container of containers) {
        let solvedValues = this.getSolvedValues(container.cells);
        this.validateUniqueValues(solvedValues);
      }
    }
    
    getSolvedValues(cells: Cell[]): number[] {
      return cells.filter(cell => cell.solved && cell.Value !== null).map(cell => cell.Value as number); 
    }
    
    validateUniqueValues(values: number[]) {
      if (values.length > 0) {
        let uniqueValues = new Set(values);
  
        if (uniqueValues.size !== values.length) {
          throw new Error("Invalid Sudoku state: duplicate values found.");
        }
      }
    }

    public populateNextSudokuInstanceFromStack(
      UnSolvedSudoku: ISudoku,
      allUnsolvedCells: Cell[]
    ): boolean {
      let flag = false;
      if (this.sudokuGuessedStates.length >= 1) {
        
        this.loadSudoku(JSON.stringify(this.sudokuGuessedStates[this.sudokuGuessedStates.length - 1]) , UnSolvedSudoku);
  
        this.populateUnsolvedCellsCollection(UnSolvedSudoku, allUnsolvedCells);
        while (allUnsolvedCells[0].PossibleValues.length === 0 && this.sudokuGuessedStates.length > 1) {
          this.sudokuGuessedStates.pop();
          this.loadSudoku(JSON.stringify(this.sudokuGuessedStates[0]), UnSolvedSudoku);
          this.populateUnsolvedCellsCollection(UnSolvedSudoku, allUnsolvedCells);
        }
  
        if (this.sudokuGuessedStates.length > 0 && allUnsolvedCells[0].PossibleValues.length !== 0) {
          this.updateSudokuGuessStack(true, UnSolvedSudoku as AbstractSudoku, allUnsolvedCells);
          flag = true;
        }
      }
      return flag;
    }
 

    }
  
  
