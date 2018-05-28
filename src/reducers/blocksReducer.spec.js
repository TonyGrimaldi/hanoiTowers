import React from 'react';
import blocksReducer from './blocksReducer';

import {
  RESTART_GAME,
  SET_DIFFICULTY_EASY,
  SET_DIFFICULTY_NORMAL,
  SET_DIFFICULTY_HARD
} from '../actions/constants';

import * as actions from '../actions/blocksReducerActions';

let mockedInitialState;
let mockedDefaulAction;
let mockedState;
let mockedInitial3BlocksArray;
let mockedInitial4BlocksArray;
let mockedInitial5BlocksArray;

beforeEach(() => {
  mockedInitialState = {
    blocks: [],
  };

  mockedDefaulAction = {
    type: undefined
  };

  mockedState = (blocksArray) => ({ blocks: blocksArray });

  mockedInitial3BlocksArray = [3, 2, 1];
  mockedInitial4BlocksArray = [4, 3, 2, 1];
  mockedInitial5BlocksArray = [5, 4, 3, 2, 1];
});

describe('blocksReducer', () => {

  it('should return its initial state', () => {
    expect(blocksReducer(mockedInitialState, mockedDefaulAction)).toEqual(mockedInitialState)
  });

  describe('RESTART_GAME', () => {
    it('should return its initial state', () => {
      expect(blocksReducer(mockedInitialState, actions.setDifficulty(RESTART_GAME))).toEqual(mockedInitialState);
    });
  });

  describe('SET_DIFFICULTY_EASY', () => {
    it('should return the correct state', () => {
      expect(blocksReducer(mockedInitialState, actions.setDifficulty(SET_DIFFICULTY_EASY))).toEqual(mockedState(mockedInitial3BlocksArray));
    });
  });

  describe('SET_DIFFICULTY_NORMAL', () => {
    it('should return the correct state', () => {
      expect(blocksReducer(mockedInitialState, actions.setDifficulty(SET_DIFFICULTY_NORMAL))).toEqual(mockedState(mockedInitial4BlocksArray));
    });
  });

  describe('SET_DIFFICULTY_HARD', () => {
    it('should return the correct state', () => {
      expect(blocksReducer(mockedInitialState, actions.setDifficulty(SET_DIFFICULTY_HARD))).toEqual(mockedState(mockedInitial5BlocksArray));
    });
  });
});