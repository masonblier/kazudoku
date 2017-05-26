import React from 'react';

export default class KazudokuGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: props.model.getCells(),
      complete: props.model.getComplete(),
      editing: null,
    };
  }

  modelListener = () => this.setState({
    cells: this.props.model.getCells(),
    complete: this.props.model.getComplete(),
  });

  componentDidMount() {
    this.props.model.subscribe(this.modelListener);
  }
  componentWillUnmount() {
    this.props.model.unsubscribe(this.modelListener);
  }
  componentWillReceiveProps(newProps) {
    this.props.model.unsubscribe(this.modelListener);
    this.setState({
      cells: newProps.model.getCells(),
      complete: newProps.model.getComplete(),
    });
    newProps.model.subscribe(this.modelListener);
  }

  render() {
    const {cells, complete} = this.state;
    const extraClass = (complete ? 'complete ' : '');
    return (
      <div className="inline-block">
        <div className="mtl mbm win-text">{complete ? 'You Win!' : '　'}</div>
        <div className={'game-board ' + extraClass}>
          {cells.map(this.renderRow)}
        </div>
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
    const {model} = this.props;
    const extraClass =
      (idx % 3 === 0 ? 'border-left ' : '') +
      (idx % 3 === 2 ? 'border-right ' : '') +
      (idx >= 3 && idx < 6 ? 'center ' : '') +
      (cell.error ? 'error ' : '') +
      (cell.static ? 'static ' : '');
    const cellIdxStr = `${cell.row},${cell.col}`;
    return (
      <div className={'game-cell ' + extraClass}>
        <div className="game-cell-inner"
          onClick={cell.static ? null : () => this.setState({editing: cellIdxStr})}
        >
          {(this.state.editing === cellIdxStr) ?
            <CellEditor
              value={cell.value || ''}
              onChange={(value) => model.updateCell(cell, value)}
              onDone={() => this.setState({editing: null})}
            />
          : (cell.value || '　')}
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
