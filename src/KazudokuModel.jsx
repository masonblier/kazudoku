
export default class KazudokuModel {
  static makeCells() {
    return [...Array(9)].map((_, rowIdx) => {
      return [...Array(9)].map((_, colIdx) => ({
        value: '　',
        row: rowIdx,
        col: colIdx,
      }))
    });
  }

  static updateCell(cells, {row, col}, value) {
    const newRow = cells[row].slice(0, col).concat(
      [{
        row, col,
        value: parseInt(value.toString().substr(0,1), 10) || '　',
      }].concat(cells[row].slice(col + 1, 9))
    );
    const newCells = cells.slice(0, row).concat(
      [newRow].concat(cells.slice(row + 1, 9))
    );
    return newCells;
  }
}
