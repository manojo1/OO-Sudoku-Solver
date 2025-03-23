"use client";
import { ISudoku } from './ISudoku'; // Assuming ISudoku is defined elsewhere
import { Cell } from './Cell'; // Assuming Cell class is defined elsewhere
import { Row } from './Row'; // Assuming Row class is defined elsewhere
import { Column } from './Column'; // Assuming Column class is defined elsewhere
import { Square } from './Square'; // Assuming Square class is defined elsewhere
import { CellContainer } from './CellContainer'; // Assuming CellContainer class is defined elsewhere
import { ISudokuSolver } from './ISudokuSolver'; // Assuming ISudokuSolver is defined elsewhere
import { log } from 'console';
import { ST } from 'next/dist/shared/lib/utils';



export class AbstractSudokuSolver implements ISudokuSolver {
  public sudokuGuessedStates: string[] = []; // Using a simple array for state stack

  constructor() {
    this.sudokuGuessedStates = [];
  }

  loadSudoku(sudokuStateStream: string, sudokuState: ISudoku) {
    let cellArray: Cell[] = JSON.parse(sudokuStateStream).map((obj: { rowID: number, colID: number, squareID: number, val: number, solved: boolean, possibleValues: string[] }) => {
      let cell = new Cell(sudokuState.gridSize, obj.rowID, obj.colID, obj.squareID);
      cell.val = obj.val;
      cell.solved = obj.solved;
      cell.possibleValues = obj.possibleValues;
      return cell;
    });

    if (cellArray.length > 0) {
      sudokuState.rows = [];
      sudokuState.columns = [];
      sudokuState.squares = [];
      sudokuState.allCells = [];

      let num = sudokuState.gridSize * sudokuState.gridSize;
      let indexLocal: number = 1;

      while (true) {
        if (indexLocal > num) {
          cellArray.forEach((cell: Cell) => {
            sudokuState.rows[cell.rowID - 1].cells.push(cell);
            sudokuState.columns[cell.colID - 1].cells.push(cell);
            sudokuState.squares[cell.squareID - 1].cells.push(cell);
            sudokuState.allCells.push(cell);
          });
          break;
        }
        sudokuState.rows.push(new Row(indexLocal));
        sudokuState.columns.push(new Column(indexLocal));
        sudokuState.squares.push(new Square(indexLocal));
        indexLocal++;
      }

    }
  }

  populateUnsolvedCellsCollection(sudokuInstance: ISudoku, allUnsolvedCells: Cell[]) {
    allUnsolvedCells.length = 0;
    sudokuInstance.allCells.forEach((cell) => {
      if (!cell.solved) {
        allUnsolvedCells.push(cell);
      }
    });
  }

  public solve(unSolvedSudoku: ISudoku) {
    // Implementation here
  }
  public guessStateCounter: number = 0;


  public updateContainersValues(colContainers: CellContainer[]): boolean {
    let flag = false;
    let flagValUpdated = false;
    let flagContainerSolved = false;

    colContainers.forEach((container) => {
      flagContainerSolved = container.Solved();
      if (!flagContainerSolved) {
        flagValUpdated = container.updatePossibleValues();
        if (flagValUpdated) {
          flag = true;
        }
      }
    });
    return flag;
  }

  public updateCols(sudokuInstance: ISudoku) {
    return this.updateContainersValues(sudokuInstance.columns);
  }

  public updateRows(sudokuInstance: ISudoku): boolean {
    return this.updateContainersValues(sudokuInstance.rows);
  }

  public updateSquares(sudokuInstance: ISudoku): boolean {
    return this.updateContainersValues(sudokuInstance.squares);
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


  public updateSudokuGuessStack(replaceStackValue: boolean, sudokuInstance: ISudoku, unsolvedCells: Cell[]) {
    this.guessStateCounter++;
    let num = parseInt(unsolvedCells[0].possibleValues[0]);
    //unsolvedCells[0].updatePossibleValues(num.toString());//TODO GETBACK1
    unsolvedCells[0].possibleValues = unsolvedCells[0].possibleValues.filter(v => v !== num.toString());
    let serializationStream = JSON.stringify(sudokuInstance.allCells);

    if (replaceStackValue) {
      this.sudokuGuessedStates.pop();
    }
    this.sudokuGuessedStates.push(serializationStream);
   unsolvedCells[0].Value = num;
  }
}

