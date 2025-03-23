"use client";
import { ISudoku } from './ISudoku'; // Assuming ISudoku is defined elsewhere
import { Cell } from './Cell'; // Assuming Cell class is defined elsewhere
import { Row } from './Row'; // Assuming Row class is defined elsewhere
import { Column } from './Column'; // Assuming Column class is defined elsewhere
import { Square } from './Square'; // Assuming Square class is defined elsewhere
import { CellContainer } from './CellContainer'; // Assuming CellContainer class is defined elsewhere
import { ISudokuSolver } from './ISudokuSolver'; // Assuming ISudokuSolver is defined elsewhere
import { log } from 'console';

export abstract class AbstractSudokuSolver_OLD implements ISudokuSolver {
  public sudokuGuessedStates: ISudoku[] = []; // Using a simple array for state stack

  public abstract solve(UnSolvedSudoku: ISudoku): void;
  public guessStateCounter: number = 0;

  protected updateContainersValues(colContainers: CellContainer[]): boolean {
    let flag = false;
    colContainers.forEach((colContainer) => {
      if (!colContainer.Solved() && colContainer.updatePossibleValues()) {
        flag = true;
      }
    });
    return flag;
  }

  protected updateSudokuGuessStack(
    replaceStackValue: boolean,
    sudokuInstance: ISudoku,
    unsolvedCells11: Cell[]
  ): void {
    this.guessStateCounter++;
    let num = parseInt(unsolvedCells11[0].possibleValues[0]);
    unsolvedCells11[0].possibleValues.splice(0, 1); // Remove the first element
    if (replaceStackValue) {
      this.sudokuGuessedStates.pop();
    }
    this.sudokuGuessedStates.push(sudokuInstance);
    unsolvedCells11[0].Value = num;
  }

  protected populateUnsolvedCellsCollection(sudokuInstance: ISudoku, allUnsolvedCells: Cell[]): void {
    allUnsolvedCells.length = 0; // Clear the existing unsolved cells
    sudokuInstance.allCells.forEach((cell) => {
      if (!cell.Solved) {
        allUnsolvedCells.push(cell);
      }
    });
  }

public localCellLoad():Cell{


  return new Cell(4,1,1,1);
}

  public loadSudoku(sudokuStateStream: ISudoku, sudokuState: ISudoku): void {
    sudokuState= JSON.parse(JSON.stringify(sudokuStateStream));
  }

  protected updateSquaresUnique(sudokuInstance: ISudoku): boolean {
    let flag = false;
    sudokuInstance.squares.forEach((square) => {
      let squareLocal = square as Square;
        if (!square.Solved() && squareLocal.findUniqueValue()) {
        flag = true;
      }
    });
    return flag;
  }

  protected updateCols(sudokuInstance: ISudoku): boolean {
    return this.updateContainersValues(sudokuInstance.columns);
  }

  protected updateRows(sudokuInstance: ISudoku): boolean {
    return this.updateContainersValues(sudokuInstance.rows);
  }

  protected updateSquares(sudokuInstance: ISudoku): boolean {
    return this.updateContainersValues(sudokuInstance.squares);
  }
}