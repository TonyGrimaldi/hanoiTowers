import React from 'react';
import { shallow } from 'enzyme';
import { ResetGame } from './resetGame';

const selectLeveRoute = '/';
let mockedProps;
let spy;
let component;

beforeEach(() => {
  mockedProps = {
    history: {
      push: jest.fn()
    },
    restartGame: jest.fn()
  };
  spy = jest.spyOn(ResetGame.prototype, 'resetStoreAndBackToInitialPage');
  component = shallow(<ResetGame { ...mockedProps } />);
});

describe('ResetGame', () => {
  describe('resetStoreAndBackToInitialPage', () => {
    it('should call restartGame', () => {
      component.instance().resetStoreAndBackToInitialPage();
      expect(mockedProps.restartGame).toHaveBeenCalled();
    });

    it('should route the application to /', () => {
      component.instance().resetStoreAndBackToInitialPage();
      expect(mockedProps.history.push).toHaveBeenCalledWith(selectLeveRoute);
    });
  });

  describe('reset button', () => {
    it('should is rendered', () => {
      const mockedResetButton = component.find({ ["data-test-id"]: "reset-button" });
      expect(mockedResetButton.length).toEqual(1);
    });

    it('should is rendered with the correct class', () => {
      const mockedResetButton = component.find({ ["data-test-id"]: "reset-button" });      
      expect(mockedResetButton.hasClass('reset-button')).toEqual(true);
    });

    it('should call resetStoreAndBackToInitialPage if clicked', () => {
      const mockedResetButton = component.find({ ["data-test-id"]: "reset-button" });

      mockedResetButton.prop('onClick')();

      expect(spy).toHaveBeenCalled();
      spy.mockClear();
    });
  });
});
