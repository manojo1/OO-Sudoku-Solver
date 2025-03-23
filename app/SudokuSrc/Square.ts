"use client";
import { CellContainer } from "./CellContainer";
import { CellContainerType } from "./CellContainerType";
import { Cell } from "./Cell";

export class Square extends CellContainer {
  constructor(squareId: number) {
    super(CellContainerType.Square, squareId);
  }

  public findUniqueValue(): boolean {
    let uniqueValue = false;
    let possibleValuesList: string[] = [];

    // Collect possible values from unsolved cells
    this.Cells.forEach(cell => {
      if (!cell.Solved) {
        possibleValuesList.push(...cell.PossibleValues);
      }
    });

    // Sort the values to find unique ones
    possibleValuesList.sort();
    let fixedVal = "";
    let count = 0;

    for (let value of possibleValuesList) {
      if (value !== fixedVal && fixedVal !== "" && count === 1) {
        uniqueValue = this.promotePossibleValueToFixed(fixedVal);
        count = 0;
      }
      if (value !== fixedVal) count = 0;
      fixedVal = value;
      count++;
    }

    if (fixedVal !== "" && count === 1) {
      uniqueValue = this.promotePossibleValueToFixed(fixedVal);
    }

    return uniqueValue;
  }

  private promotePossibleValueToFixed(fixedVal: string): boolean {
    let changed = false;
    this.Cells.forEach(cell => {
      if (!cell.Solved && cell.PossibleValues.includes(fixedVal)) {
        cell.Value = parseInt(fixedVal, 10);
        changed = true;
      }
    });
    return changed;
  }

  public renderString(gridSize: number): string {
    let htmlString = "";
    let count = 1;

    this.Cells.forEach(cell => {
      if (count % gridSize === 1) htmlString += "<tr>";
      htmlString += cell.renderString();
      count++;
    });

    return `
      <table height="100%" width="100%" 
        style="background:white;cursor:pointer;border:solid black 1px;text-align:center" 
        cellspacing="0" cellpadding="0px">
        ${htmlString}
      </table>
    `;
  }
}