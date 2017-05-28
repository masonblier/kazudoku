import React from 'react';
import SudokuPuzzles from './SudokuPuzzles';
import KazudokuModel from './KazudokuModel';

export default class KazudokuSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberCounts: props.model.getNumberCounts(),
    };
  }

  modelListener = () => this.setState({
    numberCounts: this.props.model.getNumberCounts(),
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
      numberCounts: newProps.model.getNumberCounts(),
    });
    newProps.model.subscribe(this.modelListener);
  }

  render() {
    const {model, setModel} = this.props;
    const {numberCounts} = this.state;
    return (
      <div className="sidebar">
        <div className="header">数毒</div>
        <div className="subheader">kazudoku</div>
        <div className="controls">
          <div className="mtl">
            <button className="full" onClick={() => model.checkCells()}>
              Check
            </button>
          </div>
          <div className="mtl">
            <span>New:</span>
            <button className="mlm" onClick={() => setModel(new KazudokuModel(SudokuPuzzles.nextEasy()))}>
              Easy
            </button>
            <button className="mlm pull-right" onClick={() => setModel(new KazudokuModel(SudokuPuzzles.nextHard()))}>
              Hard
            </button>
          </div>
          <div className="mtl number-counts-container">
            <div>Completed:</div>
            <div className="number-counts">
              {[...Array(9)].map((_, n) => {
                const nClass = (numberCounts[n + 1] ?
                  (numberCounts[n + 1].error) ? 'error' :
                  (numberCounts[n + 1].count === 9) ? 'completed' : null
                : null);
                return (
                  <span className={nClass}>{n + 1} </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}