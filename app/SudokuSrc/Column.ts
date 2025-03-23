"use client";
import { CellContainer } from "./CellContainer";
import { CellContainerType } from "./CellContainerType";

export class Column extends CellContainer {
  constructor(colId: number) {
    super(CellContainerType.Column, colId);
  }
}