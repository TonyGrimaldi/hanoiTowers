import React from 'react';
import {
  RESTART_GAME
} from './constants';

const mockedType = 'mockedType';

import * as actions from './blocksReducerActions';

describe('setDifficulty', () => {

  it('should return an object having as type the passed argument', () => {
    expect(actions.setDifficulty(mockedType).type).toEqual(mockedType);
  });

  it('should return undefined by not passing an argument', () => {
      expect(actions.setDifficulty().type).toEqual(undefined);
  });
});

describe('restartGame', () => {
  it('should return an object with type RESTART_GAME', () => {
    expect(actions.restartGame().type).toEqual(RESTART_GAME);
  });
});