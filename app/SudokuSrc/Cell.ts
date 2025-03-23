export class Cell {
     rowID: number;
     colID: number;
     squareID: number;
     val: number | null;
     solved: boolean;
     possibleValues: string[];
  
    constructor(gridSize: number, rowNum: number, colNum: number, squareNum: number) {
      this.possibleValues = Array.from({ length: gridSize }, (_, i) => (i + 1).toString());
      this.rowID = rowNum;
      this.colID = colNum;
      this.squareID = squareNum;
      this.val = null;
      this.solved = false;
    }
  
    public get PossibleValues(): string[] {
      return this.possibleValues;
    }
  
    set PossibleValues(values: string[]) {
      this.possibleValues = values;
    }
  
    get RowID(): number {
      return this.rowID;
    }
  
    get ColID(): number {
      return this.colID;
    }
  
    get SquareID(): number {
      return this.squareID;
    }
  
    get Value(): number | null {
      return this.val;
    }
  
    set Value(value: number) {
      this.val = value;
      this.solved = true;
      if (this.possibleValues.length > 0) {
        this.possibleValues = this.possibleValues.filter(v => v !== value.toString());
      }
    }
  
    get Solved(): boolean {
      return this.solved;
    }
  
    renderString(): string {
      return this.solved
        ? `<td class='cellB'><b>${this.val}</b></td>`
        : `<td class='cellM' rid='${this.rowID}' cid='${this.colID}'>?</td>`;
    }
  
    private populateValueAnchorTags(): string {
      return this.possibleValues.join(",");
    }
  
    updatePossibleValues(vals: string): boolean {
      let changed = false;
      if (!this.solved) {
        if (this.possibleValues.length > 1) {
          let valuesToRemove = vals.split(",");
          let initialCount = this.possibleValues.length;
          this.possibleValues = this.possibleValues.filter(v => !valuesToRemove.includes(v));
          if (initialCount > this.possibleValues.length) {
            changed = true;
          }
        }
        if (this.possibleValues.length === 1) {
          this.Value = parseInt(this.possibleValues[0]);
          changed = true;
        }
      }
      return changed;
    }
  }