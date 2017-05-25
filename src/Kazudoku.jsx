import React from 'react';
import KazudokuGame from './KazudokuGame';

export default class Kazudoku extends React.Component {
  render() {
    return (
      <div>
        <div className="sidebar">
          <div className="header">数毒</div>
          <div className="subheader">kazudoku</div>
        </div>
        <div className="game-container">
          <KazudokuGame/>
        </div>
      </div>
    );
  }
}
