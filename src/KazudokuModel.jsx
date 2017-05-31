import PuzzleData from './PuzzleData';

export default class KazudokuModel {
  static puzzleIdxs = {easy: -1, hard: -1};

  static next(mode, allowCompleted = false) {
    let nextIdx = (++KazudokuModel.puzzleIdxs[mode]) % PuzzleData[mode].length;

    const saveData = KazudokuModel.getSaveData();
    if (saveData && !allowCompleted) {
      while (nextIdx < PuzzleData[mode].length && saveData[mode][1 + nextIdx]) {
        nextIdx++;
      }
      nextIdx = nextIdx % PuzzleData[mode].length;
      KazudokuModel.puzzleIdxs[mode] = nextIdx;
    }

    return new KazudokuModel({
      id: 1 + nextIdx,
      mode: mode,
      cellData: PuzzleData[mode][nextIdx],
      alreadyCompleted: (saveData && saveData[mode][1 + nextIdx]),
    })
  }

  static makeCells(cellData = []) {
    return [...Array(9)].map((_, rowIdx) => {
      return [...Array(9)].map((_, colIdx) => {
        const nValue = parseInt(cellData[rowIdx * 9 + colIdx], 10) || null;
        return {
          value: nValue,
          row: rowIdx,
          col: colIdx,
          static: !!nValue,
        };
      });
    });
  }

  static getSaveData() {
    let saveData = null;
    if (localStorage) {
      const dataStr = localStorage['kazudoku-data'];
      try {
        saveData = JSON.parse(dataStr);
      } catch (e) {
      }
    }
    return saveData;
  }
  static setSaveData(saveData) {
    if (localStorage) {
      try {
        localStorage['kazudoku-data'] = JSON.stringify(saveData);
      } catch (e) {
      }
    }
  }

  constructor(options) {
    this.id = options.id;
    this.mode = options.mode;
    this.cells = KazudokuModel.makeCells(options.cellData);
    this.numberCounts = {};
    this.complete = false;
    this.alreadyCompleted = options.alreadyCompleted;
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

  subscribeChecking(listener) {
    this.checkingListener = listener;
  }
  unsubscribeChecking(listener) {
    this.checkingListener = null;
  }

  getId() {
    return this.id;
  }
  getCells() {
    return this.cells;
  }
  getComplete() {
    return this.complete;
  }
  getNumberCounts() {
    return this.numberCounts;
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
    if (this.checkingListener) {
      this.checkingListener(true);
    }

    this._resetCells();

    let complete = true;
    this.numberCounts = {};
    const newCells = this.cells.map((row, rowIdx) => {
      return row.map((cell, colIdx) => {
        let error = false;

        if (cell.value) {
          if (!this.numberCounts[cell.value]) {
            this.numberCounts[cell.value] = {count: 0};
          }
          this.numberCounts[cell.value].count += 1;
        }
        if (!cell.value && complete) {
          complete = false;
        }

        if (cell.value && !cell.static) {
          // row check
          error = error || this.cells[rowIdx].reduce((a, c, idx) => {
            if (idx !== colIdx) {
              if (c.value === cell.value) {
                a = true;
                this.numberCounts[cell.value].error = true;
              }
            }
            return a;
          }, false);

          // column check
          error = error || this.cells.reduce((a, row, rIdx) => {
            if (rIdx !== rowIdx) {
              if (row[colIdx].value === cell.value) {
                a = true;
                this.numberCounts[cell.value].error = true;
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
                  this.numberCounts[cell.value].error = true;
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

    if (this.complete) {
      const saveData = KazudokuModel.getSaveData() || {easy: {}, hard: {}};
      if (!saveData[this.mode][this.id]) {
        saveData[this.mode][this.id] = true;
        KazudokuModel.setSaveData(saveData);
      }
    }

    if (this.checkingListener) {
      this.checkingListener(false);
    }

    return newCells;
  }
}
