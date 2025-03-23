"use client";
import { ISudoku } from './ISudoku'; // Assuming the ISudoku interface is defined elsewhere
import { Cell } from './Cell'; // Assuming the Cell class is defined elsewhere
import { Square } from './Square';
import { AbstractSudoku } from './AbstractSudoku';
import { AbstractSudokuSolver } from './AbstractSudokuSolver';


export class QuickSolver extends AbstractSudokuSolver {
  allUnsolvedCells: Cell[] = [];
  public solve(UnSolvedSudoku: ISudoku): void {
    let flag1 = true;
    let flag2 = true;
    let flag3 = true;
    let flag4 = false;
    let flag5 = false;
    let flag6 = true;
while  (flag1 || flag2 || flag3 || flag4 || flag5) {

      try {
        flag5 = false;
        flag4 = false;
        flag1 = this.updateContainersValues(UnSolvedSudoku.rows);
        flag2 = this.updateContainersValues(UnSolvedSudoku.columns);
        flag3 = this.updateContainersValues(UnSolvedSudoku.squares);
        if (!flag1 && (!flag2 && (!flag3 && this.updateSquaresUnique(UnSolvedSudoku)))) {
          flag4 = true;
        }

        if ((!flag1 && !flag2 && !flag3 && !flag4) &&(!UnSolvedSudoku.solved)){
            this.populateUnsolvedCellsCollection(UnSolvedSudoku, this.allUnsolvedCells);
            this.updateSudokuGuessStack(false, UnSolvedSudoku , this.allUnsolvedCells); //todo change true to flase
            flag5 = true;
          }
        }

       catch (ex) {
        flag1 = false;
        flag2 = false;
        flag3 = false;
        flag4 = false;
        flag5 = this.populateNextSudokuInstanceFromStack(UnSolvedSudoku, this.allUnsolvedCells);
      }
    }
  }

  public populateNextSudokuInstanceFromStack(
    UnSolvedSudoku: ISudoku,
    allUnsolvedCells: Cell[]
): boolean {
    let flag = false;
    if (this.sudokuGuessedStates.length >= 1) {
        this.loadSudoku(this.sudokuGuessedStates[this.sudokuGuessedStates.length -1], UnSolvedSudoku);
        this.populateUnsolvedCellsCollection(UnSolvedSudoku, allUnsolvedCells);
        while ((allUnsolvedCells[0].PossibleValues.length == 0) && (this.sudokuGuessedStates.length > 1)) {
            this.sudokuGuessedStates.pop();
            this.loadSudoku(this.sudokuGuessedStates[this.updateSudokuGuessStack.length - 1], UnSolvedSudoku);
            this.populateUnsolvedCellsCollection(UnSolvedSudoku, allUnsolvedCells);
        }
        if ((this.sudokuGuessedStates.length > 0) && (allUnsolvedCells[0].PossibleValues.length != 0)) {
            this.updateSudokuGuessStack(true, UnSolvedSudoku, allUnsolvedCells);
            flag = true;
        }
        if(allUnsolvedCells[0].PossibleValues.length == 0){
            this.sudokuGuessedStates.pop();
        }
    }
    return flag;
}


}