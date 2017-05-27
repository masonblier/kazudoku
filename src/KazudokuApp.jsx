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
        <div className="footer">
          Implementation of <a href="https://en.wikipedia.org/wiki/Sudoku">Number Place</a>. Easy puzzles sampled from <a href="https://projecteuler.net/problem=96">Project Euler #96</a>. Hard puzzles sampled from <a href="http://staffhome.ecm.uwa.edu.au/~00013890/sudokumin.php">Gordon Royle's Minimum Sudoku file</a>. This implementation is released under the MIT license on <a href="https://github.com/masonblier/kazudoku">Github</a>.
        </div>
      </div>
    );
  }
}
