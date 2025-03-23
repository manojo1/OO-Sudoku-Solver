"use client";
import { Cell } from "./Cell";
import { CellContainerType } from "./CellContainerType";

export class CellContainer {
  cells: Cell[];
  private id: number;
  private type: CellContainerType;

  constructor(containerType: CellContainerType, rowId: number) {
    this.type = containerType;
    this.id = rowId;
    this.cells = [];
  }

  public get Cells(): Cell[] {
    return this.cells;
  }

  public set Cells(value: Cell[]) {
    this.cells = value;
  }

  public get Id(): number {
    return this.id;
  }

  public set Id(value: number) {
    this.id = value;
  }

  get Type(): CellContainerType {
    return this.type;
  }

  public Solved(): boolean {
    return this.cells.every(cell => cell.Solved);
  }

  updatePossibleValues() {
    let flag = false;
    let solvedValues = this.ReturnSolvedValues(this.cells);
    if (solvedValues.length > 0) {
      this.cells.forEach((cell) => {
        if (!cell.solved && cell.updatePossibleValues(solvedValues)) {
          flag = true;
        }
      });

      solvedValues = this.ReturnSolvedValues(this.cells);
      if (solvedValues.length > 0) {
        let array = solvedValues.split(",").filter(Boolean).sort();
  
        let previousValue = "";
  //implement better logic for finding duplicate
        for (let value of array) {
          if (value === previousValue) {
            throw new Error("Duplicate value found");
          }
          previousValue = value;
        }
      }
    }

    return flag;
  }

  public ReturnSolvedValues(cells: Cell[]): string {
    return cells
      .filter(cell => cell.Solved)
      .map(cell => cell.Value)
      .join(",");
  }
}



