import React from 'react';
import SudokuPuzzles from './SudokuPuzzles';
import KazudokuModel from './KazudokuModel';
import KazudokuGame from './KazudokuGame';

export default class KazudokuApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: new KazudokuModel(SudokuPuzzles.nextEasy()),
    };
  }

  render() {
    const {model} = this.state;
    return (
      <div>
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
              <button className="mlm" onClick={() => this.setState({
                model: new KazudokuModel(SudokuPuzzles.nextEasy())
              })}>
                Easy
              </button>
              <button className="mlm pull-right" onClick={() => this.setState({
                model: new KazudokuModel(SudokuPuzzles.nextHard())
              })}>
                Hard
              </button>
            </div>
          </div>
        </div>
        <div className="game-container">
          <KazudokuGame model={model}/>
        </div>
      </div>
    );
  }
}
