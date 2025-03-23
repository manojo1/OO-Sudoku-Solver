"use client";
import { ISudoku } from './ISudoku'; // Assuming the ISudoku interface is defined elsewhere
import { Cell } from './Cell'; // Assuming the Cell class is defined elsewhere
import { Square } from './Square';
import { AbstractSudoku } from './AbstractSudoku';
import { CellContainer } from './CellContainer';
import { AbstractSudokuSolver } from './AbstractSudokuSolver';

export class BruteForceNew extends AbstractSudokuSolver {
  
    checkContainers(containers: CellContainer[]) {
        for (let container of containers) {
            let solvedValues = this.getSolvedValues(container.cells);
               this.validateUniqueValues(solvedValues);
        }
    }
    validateUniqueValues(values: number[]) {
        if (values.length > 0) {
            let uniqueValues = new Set(values);
            if (uniqueValues.size !== values.length) {
                throw new Error("Invalid Sudoku state: duplicate values found.");
            }
        }
    }

    getSolvedValues(cells: Cell[]): number[] {
        return cells.filter(cell => cell.solved && cell.Value !== null).map(cell => cell.Value as number);
    }

    checkRows(sudoku: ISudoku) {
        this.checkContainers(sudoku.rows);
    }

    checkCols(sudoku: ISudoku) {
        this.checkContainers(sudoku.columns);
    }

    checkSquares(sudoku: ISudoku) {
        this.checkContainers(sudoku.squares);
    }

    returnSolvedValues(cells: Cell[]) {
        return cells.filter(cell => cell.solved).map(cell => cell.Value);
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


    allUnsolvedCells: Cell[] = [];

    public solve(sudoku: ISudoku) {
        let flag = true;
        let localCounter = 0;
       while (flag) {

            try {
                localCounter++;
                flag = false;
                this.checkRows(sudoku);
                this.checkCols(sudoku);
                this.checkSquares(sudoku);

                if (!sudoku.solved) {
                    this.populateUnsolvedCellsCollection(sudoku, this.allUnsolvedCells);
                    this.updateSudokuGuessStack(false, sudoku, this.allUnsolvedCells);
                    flag = true;
                }
            } catch (error) {
                flag = this.populateNextSudokuInstanceFromStack(sudoku, this.allUnsolvedCells);
            }
        }
    }
}

