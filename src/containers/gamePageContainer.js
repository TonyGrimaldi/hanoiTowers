import React, { Component } from 'react';
import { connect } from 'react-redux';

import GamePage from '../components/GamePage';

class GamePageContainer extends React.Component {
  render() {
    const { blocks, numberOfBlocks, history } = this.props;
    
    return (
      <GamePage 
        blocks={blocks}
        numberOfBlocks={numberOfBlocks}
        history={history} 
      />
    );
  }
}

export default connect(state => ({
  blocks: state.blocks.blocks,
  numberOfBlocks: state.blocks.blocks.length
}))(GamePageContainer);
