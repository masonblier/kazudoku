import React from 'react';
import KazudokuModel from './KazudokuModel';
import KazudokuGame from './KazudokuGame';
import KazudokuSidebar from './KazudokuSidebar';

export default class KazudokuApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: KazudokuModel.next('easy'),
    };
  }

  render() {
    const {model} = this.state;
    return (
      <div>
        <KazudokuSidebar model={model} setModel={(model) => this.setState({model})}/>
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
