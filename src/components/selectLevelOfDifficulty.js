import React, { Component } from 'react';
import {
  SET_DIFFICULTY_EASY,
  SET_DIFFICULTY_NORMAL,
  SET_DIFFICULTY_HARD
} from '../actions/constants';

export default class SelectLevelOfDifficulty extends Component {

  constructor(props) {
    super(props);

    this.startGame = this.startGame.bind(this);
  }

  startGame(difficulty) {
    this.props.setDifficulty(difficulty);
    this.props.history.push('/play');
  };

  render() {
    const selectLevel = () => (
      <div className="levels-wrapper">
        <ul className="levels-list">
          <li><button onClick={() => this.startGame(SET_DIFFICULTY_EASY)} data-test-id="button-difficulty-easy">EASY</button></li>
          <li><button onClick={() => this.startGame(SET_DIFFICULTY_NORMAL)} data-test-id="button-difficulty-normal">NORMAL</button></li>
          <li><button onClick={() => this.startGame(SET_DIFFICULTY_HARD)} data-test-id="button-difficulty-hard">HARD</button></li>
        </ul>
      </div>
    );

    return (
      <div className="select-level-container">
        <div className='start-title'>
          <h1>THE ANTI-GRAVITY HANOI TOWER</h1>
          <h2>SELECT DIFFICULTY</h2>
        </div>
        {selectLevel()}
      </div>
    );
  }
}
