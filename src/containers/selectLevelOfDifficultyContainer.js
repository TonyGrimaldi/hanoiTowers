import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setDifficulty } from '../actions/blocksReducerActions';
import SelectLevelOfDifficulty from '../components/selectLevelOfDifficulty';

class SelectLevelOfDifficultyContainer extends Component {
  render() {
  
    return (
      <SelectLevelOfDifficulty 
        history={this.props.history}
        setDifficulty={this.props.setDifficulty}
      />
    );
  }
}

export default connect(null, {
  setDifficulty
})(SelectLevelOfDifficultyContainer);
