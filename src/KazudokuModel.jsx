export default class KazudokuModel {
  static makeCells(boardData = []) {
    return [...Array(9)].map((_, rowIdx) => {
      return [...Array(9)].map((_, colIdx) => {
        const nValue = parseInt(boardData[rowIdx * 9 + colIdx], 10) || null;
        return {
          value: nValue,
          row: rowIdx,
          col: colIdx,
          static: !!nValue,
        };
      });
    });
  }

  constructor(boardData) {
    this.cells = KazudokuModel.makeCells(boardData);
    this.complete = false;
    this._subscribers = [];
  }

  subscribe(listener) {
    this._subscribers.push(listener);
  }
  unsubscribe(listener) {
    const sIdx = this._subscribers.indexOf(listener);
    if (sIdx > -1) {
      this._subscribers.splice(sIdx, 1);
    }
  }
  emitUpdate() {
    this._subscribers.forEach((listener) => listener());
  }

  getCells() {
    return this.cells;
  }
  getComplete() {
    return this.complete;
  }

  updateCell({row, col}, value) {
    const newRow = this.cells[row].slice(0, col).concat(
      [{
        row, col,
        value: parseInt(value.toString().substr(0,1), 10) || null,
        error: undefined,
      }].concat(this.cells[row].slice(col + 1, 9))
    );
    const newCells = this.cells.slice(0, row).concat(
      [newRow].concat(this.cells.slice(row + 1, 9))
    );

    this.cells = newCells;
    this.emitUpdate();

    return newCells;
  }

  _resetCells() {
    const newCells = this.cells.map((row) => {
      return row.map((cell) => {
        return {
          ...cell,
          error: undefined,
        };
      });
    });
    this.cells = newCells;
  }
  checkCells() {
    this._resetCells();

    let complete = true;
    const newCells = this.cells.map((row, rowIdx) => {
      return row.map((cell, colIdx) => {
        let error = false;

        if (!cell.value) {
          complete = false;
        }
        if (cell.value && !cell.static) {
          // row check
          error = error || this.cells[rowIdx].reduce((a, c, idx) => {
            if (idx !== colIdx) {
              if (c.value === cell.value) {
                a = true;
              }
            }
            return a;
          }, false);

          // column check
          error = error || this.cells.reduce((a, row, rIdx) => {
            if (rIdx !== rowIdx) {
              if (row[colIdx].value === cell.value) {
                a = true;
              }
            }
            return a;
          }, false);

          // box check
          const boxTopIdx = Math.floor(rowIdx / 3) * 3;
          const boxLeftIdx = Math.floor(colIdx / 3) * 3;
          error = error || [...Array(3)].reduce((rA, _, rOffset) => {
            const rIdx = boxTopIdx + rOffset;
            const rE = [...Array(3)].reduce((a, _, cOffset) => {
              const cIdx = boxLeftIdx + cOffset;
              const c = this.cells[rIdx][cIdx];
              if (rIdx !== rowIdx && cIdx !== colIdx) {
                if (c.value === cell.value) {
                  a = true;
                }
              }
              return a;
            }, false);
            return rE || rA;
          }, false);
        }

        return {
          ...cell,
          error,
        };
      });
    });

    this.cells = newCells;
    this.complete = complete;
    this.emitUpdate();

    return newCells;
  }
}
