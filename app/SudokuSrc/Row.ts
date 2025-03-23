"use client";
// types/Row.ts
import { CellContainer } from "./CellContainer";
import { CellContainerType } from "./CellContainerType";

export class Row extends CellContainer {
  constructor(rowId: number) {
    super(CellContainerType.Row, rowId);
  }
}