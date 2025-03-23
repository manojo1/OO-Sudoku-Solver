"use client";
import { Cell } from './Cell'; // Assuming the Cell class is defined elsewhere

export class CellPosValCountComparer {
  compare(first: Cell, second: Cell): number {
    // Compare the count of PossibleValues arrays first
    let num = first.PossibleValues.length - second.PossibleValues.length;
    
    if (num === 0) {
      // If the count of PossibleValues is the same, compare RowID
      num = first.RowID - second.RowID;
    }
    
    if (num === 0) {
      // If RowID is also the same, compare ColID
      num = first.ColID - second.ColID;
    }
    
    return num;
  }
}