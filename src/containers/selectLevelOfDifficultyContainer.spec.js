/*
import React from 'react';
import { shallow } from 'enzyme';
import { SelectLevelOfDifficultyContainer } from './selectLevelOfDifficultyContainer';
import SelectLevelOfDifficulty from '../components/selectLevelOfDifficulty';

let component;
let mockedProps;

beforeEach(() => {
  mockedProps = {
    history: {
      push: jest.fn()
    },
    setDifficulty: jest.fn(),
    store: {
      blocks: [5, 4, 3, 2, 1]
    },
  };
  component = shallow(<SelectLevelOfDifficultyContainer { ...mockedProps } />, { } );
});

describe('SelectLevelOfDifficultyContainer', () => {
  it('should render SelectLevelOfDifficulty', () => {
    expect(component.instance().find(SelectLevelOfDifficulty)).toHaveLength(1)
  })
})

*/