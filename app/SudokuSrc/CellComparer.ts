"use client";
import { Cell } from './Cell'; // Assuming the Cell class is defined in another file

export class CellComparer  {
  compare(first: Cell, second: Cell): number {
    let num = first.RowID - second.RowID; // Compare RowIDs first
    if (num === 0) {
      num = first.ColID - second.ColID; // If RowIDs are the same, compare ColIDs
    }
    return num;
  }
}