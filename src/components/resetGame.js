import React, { Component } from 'react';
import { connect } from 'react-redux';
import { restartGame } from '../actions/blocksReducerActions';

export class ResetGame extends Component {

  constructor(props) {
    super(props);
  this.resetStoreAndBackToInitialPage = this.resetStoreAndBackToInitialPage.bind(this);
  }

  resetStoreAndBackToInitialPage() {
    this.props.restartGame();
    this.props.history.push('/');
  }

  render() {
    return(
      <div className="reset-game-wrapper">
        <button className="reset-button" onClick={this.resetStoreAndBackToInitialPage} data-test-id="reset-button">Restart Game</button>
      </div>
    );
  }
}

export default connect(null,
  { restartGame })(ResetGame);
