
import React, { Component } from 'react';
import ResetGame from '../components/resetGame';

export const tower1 = 'tower1';
export const tower2 = 'tower2';
export const tower3 = 'tower3';

export default class GamePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedBlock: [],
      [tower1]: this.props.blocks,
      [tower2]: [],
      [tower3]: []
    };

    this.thereIsASelectedBlock = this.thereIsASelectedBlock.bind(this);
    this.towerContainsSelectedBlock = this.towerContainsSelectedBlock.bind(this);
    this.removeSelectedBlockFromTower = this.removeSelectedBlockFromTower.bind(this);
    this.removeSelectedBlockFromAnyTower = this.removeSelectedBlockFromAnyTower.bind(this);
    this.SelectBlockFromTower = this.SelectBlockFromTower.bind(this);
    this.addSelectedBlockToTower = this.addSelectedBlockToTower.bind(this);
    this.blockCanGoToTower = this.blockCanGoToTower.bind(this);
    this.addSelectedBlockToTowerAndDeselectBlock = this.addSelectedBlockToTowerAndDeselectBlock.bind(this)
    this.moveSelectedBlockToTowerIfPossible = this.moveSelectedBlockToTowerIfPossible.bind(this);
    this.deselectBlockIfMovementIsNotPossible = this.deselectBlockIfMovementIsNotPossible.bind(this);
    this.selectMoveOrDeselectBlock = this.selectMoveOrDeselectBlock.bind(this);
  }


  thereIsASelectedBlock() {
    if (this.state.selectedBlock.length === 0) return false;
    return true;
  };

  towerContainsSelectedBlock(towerName) {
    if (this.state[towerName].indexOf(this.state.selectedBlock[0]) !== -1) return true;
    return false;
  };

  removeSelectedBlockFromTower(towerName) {
    this.setState(prevState => (
      { [towerName]: prevState[towerName].filter(block => block !== this.state.selectedBlock[0]) })
    );
  };

  removeSelectedBlockFromAnyTower() {
    const towersList = [tower1, tower2, tower3];
    for (let i = 0; i < towersList.length; i++) {
      if (this.towerContainsSelectedBlock(towersList[i])) {
        this.removeSelectedBlockFromTower(towersList[i]);
      }
    };
  };

  SelectBlockFromTower(towerName) {
    if (!this.thereIsASelectedBlock()
      && this.state[towerName].length > 0) {
      let smallestBlockOfTower = this.state[towerName].length - 1;
      this.setState(prevState => (
        { selectedBlock: prevState.selectedBlock.concat(this.state[towerName][smallestBlockOfTower]) })
      );
    }
  };

  blockCanGoToTower(towerName) {
    let index = this.state[towerName].length -1;
    if (this.state.selectedBlock[0] < this.state[towerName][index]) return true;
    else if (this.state[towerName].length === 0) return true;
    return false;
  };

  addSelectedBlockToTowerAndDeselectBlock(towerName) {
    this.setState(prevState => (
      { [towerName]: prevState[towerName].concat(prevState.selectedBlock), selectedBlock: [] })
    );
  };

  addSelectedBlockToTower(towerName) {
    if (this.state[towerName].length === 0 || this.blockCanGoToTower(towerName)) {
      this.addSelectedBlockToTowerAndDeselectBlock(towerName);
    }
    return;
  };

  moveSelectedBlockToTowerIfPossible(towerName) {
    if (
    this.thereIsASelectedBlock()
    && this.blockCanGoToTower(towerName)
    && !this.towerContainsSelectedBlock(towerName)
    ) {
      this.addSelectedBlockToTower(towerName);
      this.removeSelectedBlockFromAnyTower();
      }
    return;
  };

  deselectBlockIfMovementIsNotPossible(towerName) {
    if (this.thereIsASelectedBlock()) {
      if (
      this.towerContainsSelectedBlock(towerName)
      || !this.blockCanGoToTower(towerName)
      ) { this.setState({ selectedBlock: [] }) }
    }
    return;
  };

  selectMoveOrDeselectBlock(towerName) {
    if (!this.thereIsASelectedBlock(towerName)) this.SelectBlockFromTower(towerName);
    else {
      this.moveSelectedBlockToTowerIfPossible(towerName);
      this.deselectBlockIfMovementIsNotPossible(towerName);
    }
  };

  render() {

    const showSelectedBlock = () => (
        <div className="selected">YOUR BLOCK TO MOVE IS:
          <span className={`block-${this.state.selectedBlock[0]}`} data-test-id="selected-block">
            {this.state.selectedBlock[0]}
          </span>
      </div>
    );

    const Game = () => {
      if (this.state[tower3].length === this.props.numberOfBlocks) {
        return (
          <div className="victory">GAME COMPLETED, VICTORY!! <div>YOU ARE A CHAMPION MY FRIEND!!!</div></div>
      )}
      return (
        <div className="game-page-wrapper">
          {showSelectedBlock()}
          <div className="tower tower-one" onClick={() => this.selectMoveOrDeselectBlock(tower1)} data-test-id="tower-one">
            <ul>{this.state[tower1].map(el => <li key={el} className={`block-${el}`} data-test-id={`block-${el}`}>{el}</li>)}</ul>
          </div>
          <div className="tower tower-two" onClick={() => this.selectMoveOrDeselectBlock(tower2)} data-test-id="tower-two">
            <ul>{this.state[tower2].map(el => <li key={el} className={`block-${el}`} data-test-id={`block-${el}`}>{el}</li>)}</ul>
          </div>
          <div className="tower tower-three" onClick={() => this.selectMoveOrDeselectBlock(tower3)} data-test-id="tower-three">
            <ul>{this.state[tower3].map(el => <li key={el} className={`block-${el}`} data-test-id={`block-${el}`}>{el}</li>)}</ul>
          </div>
        </div>
      );
    };

    return (
      <div>
        {Game()}
        <ResetGame history={this.props.history} />
      </div>
    );
  };
}
