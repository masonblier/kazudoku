import React from 'react';
import KazudokuModel from './KazudokuModel';

export default class KazudokuGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: KazudokuModel.makeCells(),
      editing: null,
    };
  }

  render() {
    const {cells} = this.state;
    return (
      <div className="game-board">
        {cells.map(this.renderRow)}
      </div>
    );
  }

  renderRow = (row, idx) => {
    const extraClass =
      (idx % 3 === 0 ? 'border-top ' : '') +
      (idx % 3 === 2 ? 'border-bottom ' : '') +
      (idx >= 3 && idx < 6 ? 'middle ' : '');
    return (
      <div className={'game-row ' + extraClass}>
        {row.map(this.renderCell)}
      </div>
    );
  }

  renderCell = (cell, idx) => {
    const extraClass =
      (idx % 3 === 0 ? 'border-left ' : '') +
      (idx % 3 === 2 ? 'border-right ' : '') +
      (idx >= 3 && idx < 6 ? 'center ' : '');
    const cellIdxStr = `${cell.row},${cell.col}`;
    return (
      <div className={'game-cell ' + extraClass}>
        <div className="game-cell-inner"
          onClick={() => this.setState({editing: cellIdxStr})}
        >
          {(this.state.editing === cellIdxStr) ?
            <CellEditor
              value={cell.value}
              onChange={(value) => this.setState({
                cells: KazudokuModel.updateCell(this.state.cells, cell, value),
              })}
              onDone={() => this.setState({editing: null})}
            />
          : cell.value}
        </div>
      </div>
    );
  }
}

function CellEditor({
  value,
  onChange,
  onDone,
}) {
  return (
    <input type="text" className="game-cell-edit-box"
      ref={(r) => r && r.focus()}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={(e) => onDone()}
      onFocus={(e) => e.target.select()}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          e.target.blur();
        }
      }}
    />
  );
}
