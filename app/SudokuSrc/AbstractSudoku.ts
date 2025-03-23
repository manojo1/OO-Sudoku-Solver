"use client";
import { Cell } from './Cell';  // Import the Cell class from the previous code
import { Column } from './Column';
import { Row } from './Row';
import { Square } from './Square';
import { ISudoku } from './ISudoku';
import { ISudokuSolver } from './ISudokuSolver';
import { QuickSolver } from './QuickSolver';

export class AbstractSudoku implements ISudoku {
 /*
  protected rows: Row[] = [];
  protected columns: Column[] = [];
  protected squares: Square[] = [];
  protected allCells: Cell[] = [];
  protected gridSize: number;
  protected solveStrategy: ISudokuSolver | null = null;
*/

 rows: Row[] = [];
 columns: Column[] = [];
 squares: Square[] = [];
 allCells: Cell[] = [];
 gridSize: number;
 solveStrategy: ISudokuSolver | null = null;


constructor(gridSize: number) {
    this.gridSize = gridSize;
    this.initialiseSudoku(gridSize);
  }

  get Rows() {
    return this.rows;
  }

  get Columns() {
    return this.columns;
  }

  get Squares() {
    return this.squares;
  }

  get AllCells() {
    return this.allCells;
  }

  get GridSize() {
    return this.gridSize;
  }

  set SolveStrategy(strategy: ISudokuSolver) {
    this.solveStrategy = strategy;
  }

  private initialiseSudoku(gridSize: number) {
    let gridSize1 = gridSize * gridSize;
    let num = Math.pow(gridSize1, 2);

    for (let index = 1; index <= gridSize1; ++index) {
      this.rows.push(new Row(index));
      this.columns.push(new Column(index));
      this.squares.push(new Square(index));
    }

    for (let index = 1; index <= num; ++index) {
      let colNum = index % gridSize1 === 0 ? gridSize1 : index % gridSize1;
      let rowNum = index % gridSize1 === 0 ? Math.floor(index / gridSize1) : Math.floor(index / gridSize1) + 1;
      let squareNum =
        (rowNum <= gridSize
          ? 0
          : rowNum % gridSize === 0
          ? Math.floor(rowNum / gridSize) - 1
          : Math.floor(rowNum / gridSize)) *
          gridSize +
        (colNum <= gridSize
          ? 1
          : colNum % gridSize === 0
          ? Math.floor(colNum / gridSize)
          : Math.floor(colNum / gridSize) + 1);

      let cell = new Cell(gridSize1, rowNum, colNum, squareNum);
      this.rows[rowNum - 1].Cells.push(cell);
      this.columns[colNum - 1].Cells.push(cell);
      this.squares[squareNum - 1].Cells.push(cell);
      this.allCells.push(cell);
    }
  }

  setFixedCellValue(rowNum: number, colNum: number, value: number) {
    this.rows[rowNum - 1].Cells[colNum - 1].Value = value;
  }

  solve() {
    if (this.solveStrategy) {
      this.solveStrategy.solve(this);
    }else{
      this.solveStrategy = new QuickSolver();
      this.solveStrategy.solve(this);
    }
  }

  get solved(): boolean {
    return this.squares.every((square) => square.Solved());
  }

  copy(): ISudoku {
    let clonedSudoku = JSON.parse(JSON.stringify(this)); // Deep copy
    return clonedSudoku;
  }
}