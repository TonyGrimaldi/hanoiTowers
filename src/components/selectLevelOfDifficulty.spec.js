import React from 'react';
import { shallow } from 'enzyme';
import SelectLevelOfDifficulty from './selectLevelOfDifficulty';
import {
  SET_DIFFICULTY_EASY,
  SET_DIFFICULTY_NORMAL,
  SET_DIFFICULTY_HARD
} from '../actions/constants';

const defaultPlayRoute = '/play';
let mockedProps;
let component;

beforeEach(() => {
  mockedProps = {
    history: {
      push: jest.fn()
    },
    setDifficulty: jest.fn()
  };
  component = shallow(<SelectLevelOfDifficulty { ...mockedProps } />);
});

describe('SelectLevelOfDifficulty', () => {
  describe('startGame', () => {
    it('should call setDifficulty with the passed difficulty', () => {
      const mockedDifficulty = 'EASY';

      component.instance().startGame(mockedDifficulty);

      expect(mockedProps.setDifficulty).toHaveBeenCalledWith(mockedDifficulty);
    });

    it('should route the application to /play', () => {
      component.instance().startGame('something');
      expect(mockedProps.history.push).toHaveBeenCalledWith(defaultPlayRoute);
    });
  });

  describe('button set difficulty easy', () => {
    it('should is always rendered', () => {
      const mockedButtonDifficultyEasy = component.find({ ["data-test-id"]: "button-difficulty-easy" });
      expect(mockedButtonDifficultyEasy.length).toEqual(1);
    });

    it('should set difficulty easy if clicked', () => {
      const mockedButtonDifficultyEasy = component.find({ ["data-test-id"]: "button-difficulty-easy" });

      component.instance().startGame = jest.fn();
      mockedButtonDifficultyEasy.prop('onClick')();

      expect(component.instance().startGame).toHaveBeenCalledWith(SET_DIFFICULTY_EASY);
    });
  });

  describe('button set difficulty normal', () => {
    it('should is always rendered', () => {
      const mockedButtonDifficultyNormal = component.find({ ["data-test-id"]: "button-difficulty-normal" });
      expect(mockedButtonDifficultyNormal.length).toEqual(1);
    });

    it('should set difficulty easy if clicked', () => {
      const mockedButtonDifficultyNormal = component.find({ ["data-test-id"]: "button-difficulty-normal" });

      component.instance().startGame = jest.fn();
      mockedButtonDifficultyNormal.prop('onClick')();

      expect(component.instance().startGame).toHaveBeenCalledWith(SET_DIFFICULTY_NORMAL);
    });
  });

  describe('button set difficulty hard', () => {
    it('should is always rendered', () => {
      const mockedButtonDifficultyHard = component.find({ ["data-test-id"]: "button-difficulty-hard" });
      expect(mockedButtonDifficultyHard.length).toEqual(1);
    });

    it('should set difficulty easy if clicked', () => {
      const mockedButtonDifficultyHard = component.find({ ["data-test-id"]: "button-difficulty-hard" });

      component.instance().startGame = jest.fn();
      mockedButtonDifficultyHard.prop('onClick')();

      expect(component.instance().startGame).toHaveBeenCalledWith(SET_DIFFICULTY_HARD);
    });
  });
});
