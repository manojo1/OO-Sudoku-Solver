"use client";
import { AbstractSudoku } from './AbstractSudoku'; // Assuming AbstractSudoku is in a separate file
import { Square } from './Square'; // Import Square class
import { CellContainerComparer } from './CellContainerComparer'; // Import the comparer class


export class Sudoku extends AbstractSudoku {
  constructor(gridSize: number) {
    super(gridSize);
  }
 
  renderString(): string {
    let str = '';
    let num = 1;
    
    // Sort the squares, rows, and columns based on CellContainerComparer logic
    let sCompare= new CellContainerComparer();
    let rCompare= new CellContainerComparer();
    let cCompare= new CellContainerComparer();

    this.squares.sort(new CellContainerComparer().compare);
    this.rows.sort(new CellContainerComparer().compare);
    this.columns.sort(new CellContainerComparer().compare);

this.squares.forEach((square) => {
      if (square.Id % this.gridSize === 1) str += '<tr><td>';
      str += `<td>${square.renderString(this.gridSize)}</td>`;
      num++;
    });

    // Conditional rendering of different table styles based on gridSize
    if (this.gridSize >= 4) {
      return "<table>" + str + "</table";
      /* 
      <br /><br />
        <head>
          <style type='text/css'>
            .cellM {
              word-wrap: break-word;
              background: #fcfcfc;
              border: solid lightgrey 1px;
              font-size: .7em;
              width: 35px;
              height: 35px;
            }
            .cellB {
              word-wrap: break-word;
              color: darkblue;
              border: solid lightgrey 1px;
              width: 35px;
              height: 35px;
            }
          </style>
        </head>
        <table style='border: solid black 1px;' cellspacing='0' cellpadding='0'>
          ${str}
        </table> */
      ;
    } else {
        return "<table>" + str + "</table>";
  
      /*
        <br /><br />
        <head>
          <style type='text/css'>
            .cellM {
              word-wrap: break-word;
              background: #fcfcfc;
              border: solid lightgrey 1px;
              font-size: .7em;
              width: 60px;
              height: 60px;
            }
            .cellB {
              word-wrap: break-word;
              color: darkblue;
              border: solid lightgrey 1px;
              width: 60px;
              height: 60px;
            }
          </style>
        </head>
        <table style='border: solid black 1px;' cellspacing='0' cellpadding='0'>
          ${str}
        </table>"
        */
      ;
    }
  }
}