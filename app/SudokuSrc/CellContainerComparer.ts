"use client";
import { CellContainer } from './CellContainer';

interface IComparer<T> {
    compare(a: T, b: T): number;
}
export class CellContainerComparer 
{
    compare(first: CellContainer, second: CellContainer): number {
        return first.Id - second.Id;
    }
}
;