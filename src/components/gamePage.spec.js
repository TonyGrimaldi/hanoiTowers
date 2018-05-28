import React from 'react';
import { shallow } from 'enzyme';

import GamePage, {
  tower1,
  tower2,
  tower3
} from './gamePage';

let component;
const mockedProps = {
  blocks: [5, 4, 3, 2, 1],
  numberOfblocks: 5,
  history: { push: jest.fn() }
}

const mockSelectedBlock = value => { component.setState({ selectedBlock: [value] }) };

beforeEach(() => {
  component = shallow(<GamePage {...mockedProps} />)
});

describe('GamePage', () => {
  describe('thereIsASelectedBlock', () => {
    it('should return true if there is a selected block', () => {
      mockSelectedBlock(1);
      expect(component.instance().thereIsASelectedBlock()).toEqual(true);
    });

    it('should return false if there is not a selected block', () => {
      expect(component.instance().thereIsASelectedBlock()).toEqual(false);
    });
  });

  describe('towerContainsSelectedBlock', () => {
    it('should return true if the passed tower contains the currently selected block', () => {
      const mockedSelectedBlock = 3;
      component.setState({ selectedBlock: [mockedSelectedBlock], [tower1]: [4, mockedSelectedBlock] });

      expect(component.instance().towerContainsSelectedBlock(tower1)).toEqual(true);
    });

    it('should return false if the passed tower doesn\'t contains the currently selected block', () => {
      const mockedSelectedBlock = 3;
      component.setState({ selectedBlock: [mockedSelectedBlock], [tower1]: [4, 2] })

      expect(component.instance().towerContainsSelectedBlock(tower1)).toEqual(false);
    });
  });

  describe('removeSelectedBlockFromTower', () => {
    it('should remove selected block if present in the passed tower', () => {
      const mockedSelectedBlock = 1;

      component.setState({ selectedBlock: [mockedSelectedBlock], [tower1]: [mockedSelectedBlock, 2, 3, 4] });
      component.instance().removeSelectedBlockFromTower(tower1);

      expect(component.instance().state[tower1]).toEqual([2, 3, 4])
    });

    it('should not modify the base tower when the tower does not contain the selected block', () => {
      const baseTower = [1, 2, 3, 4];

      component.setState({ selectedBlock: [5], [tower1]: baseTower });
      component.instance().removeSelectedBlockFromTower(tower1);

      expect(component.instance().state[tower1]).toEqual(baseTower);
    });
  });

  describe('removeSelectedBlockFromAnyTower', () => {
    it('should remove the selected block from the tower containing that block', () => {
      const tower1Mock = [6, 7];
      const tower2Mock = [3, 4, 5];
      const tower3Mock = [1, 2];

      component.setState({ selectedBlock: [1], [tower1]: tower1Mock, [tower2]: tower2Mock, [tower3]: tower3Mock });
      component.instance().removeSelectedBlockFromAnyTower();

      expect(component.instance().state[tower3]).toEqual([2]);
    });

    it('should not modify any tower if they don\'t contain the selected block', () => {
      const tower1Mock = [];
      const tower2Mock = [3, 4, 5];
      const tower3Mock = [1, 2];

      component.setState({ selectedBlock: [8], [tower1]: tower1Mock, [tower2]: tower2Mock, [tower3]: tower3Mock });

      expect(component.instance().state[tower1]).toEqual(tower1Mock);
      expect(component.instance().state[tower2]).toEqual(tower2Mock);
      expect(component.instance().state[tower3]).toEqual(tower3Mock);
      expect(component.instance().state.selectedBlock).toEqual([8]);
    });
  });

  describe('SelectBlockFromTower', () => {
    it('should select the last block of the passed tower', () => {
      component.setState({ selectedBlock: [], [tower2]: [5, 4] });
      component.instance().SelectBlockFromTower(tower2);

      expect(component.instance().state.selectedBlock).toEqual([4]);
    });

    it('should not select a block if there is an existing selected block', () => {
      component.setState({ selectedBlock: [3], [tower2]: [5, 4] });
      component.instance().SelectBlockFromTower(tower2);

      expect(component.instance().state.selectedBlock).toEqual([3]);
    });

    it('should not select a block from an empty tower', () => {
      component.setState({ selectedBlock: [3], [tower2]: [] });
      component.instance().SelectBlockFromTower(tower2);

      expect(component.instance().state.selectedBlock).toEqual([3]);
    });
  });

  describe('blockCanGoToTower', () => {
    it('should return true if selected block is smaller then the last block of the passed tower', () => {
      component.setState({ selectedBlock: [3], [tower2]: [7, 6, 5, 4] });
      expect(component.instance().blockCanGoToTower(tower2)).toEqual(true);
    });

    it('should return false if selected block is bigger then the last block of the passed tower', () => {
      component.setState({ selectedBlock: [5], [tower2]: [7, 6, 5, 4] });
      expect(component.instance().blockCanGoToTower(tower2)).toEqual(false);
    });
  });

  describe('addSelectedBlockToTowerAndDeselectBlock', () => {
    it('should add selected block to the passed tower', () => {
      mockSelectedBlock(2);
      component.instance().addSelectedBlockToTowerAndDeselectBlock(tower2);

      expect(component.instance().state[tower2]).toEqual([2]);
    });

    it('should deselect the previously selected block', () => {
      mockSelectedBlock(2);
      component.instance().addSelectedBlockToTowerAndDeselectBlock(tower2);

      expect(component.instance().state.selectedBlock).toEqual([]);
    });
  });

  describe('addSelectedBlockToTower', () => {
    it('should add selected Block to the passed tower', () => {
      const tower1Mock = [];
      const tower2Mock = [8, 7, 6];
      const tower3Mock = [5, 4];
      const mockedSelectedBlock = [3];

      component.setState({ [tower1]: tower1Mock, [tower2]: tower2Mock, [tower3]: tower3Mock, selectedBlock: mockedSelectedBlock })
      component.instance().addSelectedBlockToTower(tower3);

      expect(component.instance().state[tower3]).toEqual([...tower3Mock, ...mockedSelectedBlock]);
    });

    it('should not mutate others towers', () => {
      const tower1Mock = [];
      const tower2Mock = [3, 4, 5];
      const tower3Mock = [1, 2];

      component.setState({ [tower1]: tower1Mock, [tower2]: tower2Mock, [tower3]: tower3Mock, selectedBlock: [6] });
      component.instance().addSelectedBlockToTower(tower3);

      expect(component.instance().state[tower1]).toEqual(tower1Mock);
      expect(component.instance().state[tower2]).toEqual(tower2Mock);
    });
  });

  describe('moveSelectedBlockToTowerIfPossible', () => {
    it('should add selected block to the passed tower', () => {
      mockSelectedBlock(3);
      component.instance().moveSelectedBlockToTowerIfPossible(tower2);

      expect(component.instance().state[tower2]).toEqual([3]);
    });

    it('should deselect the selected block after it has been added to a tower', () => {
      mockSelectedBlock(3);
      component.instance().moveSelectedBlockToTowerIfPossible(tower2);

      expect(component.instance().state.selectedBlock).toEqual([]);
    });

    it('should not add selected block to the passed tower if it is bigger then the last block of the tower', () => {
      const tower1Mock = [2, 1]

      component.setState({ selectedBlock: [3], [tower1]: tower1Mock });
      component.instance().moveSelectedBlockToTowerIfPossible(tower1);

      expect(component.instance().state[tower1]).toEqual(tower1Mock);
    });

    it('should not add a block if selected block is still contained inside the passed tower', () => {
      const tower1Mock = [4, 3]

      component.setState({ selectedBlock: [3], [tower1]: tower1Mock });
      component.instance().moveSelectedBlockToTowerIfPossible(tower1);

      expect(component.instance().state[tower1]).toEqual(tower1Mock);
    });
  });

  describe('deselectBlockIfMovementIsNotPossible', () => {
    it('should reset selected block if the passed tower still contains selected block', () => {
      const mockedSelectedBlock = 3

      component.setState({ selectedBlock: mockedSelectedBlock, [tower2]: [5, 4, mockedSelectedBlock] });
      component.instance().deselectBlockIfMovementIsNotPossible(tower2);

      expect(component.instance().state.selectedBlock).toEqual([]);
    });

    it('should reset selected block if it is bigger then the last block of the passed tower', () => {
      component.setState({ selectedBlock: [3], [tower2]: [2, 1] });
      component.instance().deselectBlockIfMovementIsNotPossible(tower2);

      expect(component.instance().state.selectedBlock).toEqual([]);
    });

    it('should persist selected block if it can be moved', () => {
      component.setState({ selectedBlock: [4], [tower2]: [6, 5] });
      component.instance().deselectBlockIfMovementIsNotPossible(tower2);

      expect(component.instance().state.selectedBlock).toEqual([4]);
    });
  });

  describe('selectMoveOrDeselectBlock', () => {
    it('should move a block to a tower if it can be moved', () => {
      const tower2Mock = [5, 4, 3, 2];
      const mockedSelectedBlock = [1];

      component.setState({ selectedBlock: [...mockedSelectedBlock], [tower2]: [...tower2Mock] });
      component.instance().selectMoveOrDeselectBlock(tower2);

      expect(component.instance().state[tower2]).toEqual([...tower2Mock, ...mockedSelectedBlock]);
    });

    it('should deselect a block if it cannot be moved', () => {

      const mockedSelectedBlock = [5];

      component.setState({ selectedBlock: [...mockedSelectedBlock], [tower1]: [3, 2, ...mockedSelectedBlock] });
      component.instance().selectMoveOrDeselectBlock(tower1);

      expect(component.instance().state.selectedBlock).toEqual([]);
    });

    it('should select a block if there is not selected block', () => {
      const tower2Mock = [3, 2, 1];
      component.setState({ [tower2]: [...tower2Mock] });
      component.instance().selectMoveOrDeselectBlock(tower2);

      expect(component.instance().state.selectedBlock).toEqual([1]);
    });
  });
 
  describe('towers', () => {
    it('should are always rendered', () => {
      const tower1Mock = component.find({ ["data-test-id"]: "tower-one" });
      const tower2Mock = component.find({ ["data-test-id"]: "tower-two" });
      const tower3Mock = component.find({ ["data-test-id"]: "tower-three" });

      expect(tower1Mock.length).toEqual(1);
      expect(tower2Mock.length).toEqual(1);
      expect(tower3Mock.length).toEqual(1);
    });
  });

  describe('blocks', () => {
    it('should are always rendered', () => {
      const block1Mock = component.find({ ["data-test-id"]: "block-1" });
      const block2Mock = component.find({ ["data-test-id"]: "block-2" });
      const block3Mock = component.find({ ["data-test-id"]: "block-3" });
      const block4Mock = component.find({ ["data-test-id"]: "block-4" });
      const block5Mock = component.find({ ["data-test-id"]: "block-5" });

      expect(block1Mock.length).toEqual(1);
      expect(block2Mock.length).toEqual(1);
      expect(block3Mock.length).toEqual(1);
      expect(block4Mock.length).toEqual(1);
      expect(block5Mock.length).toEqual(1);
    });

    it('should are always rendered with the correct class', () => {
      const block1Mock = component.find({ ["data-test-id"]: "block-1" });
      const block2Mock = component.find({ ["data-test-id"]: "block-2" });
      const block3Mock = component.find({ ["data-test-id"]: "block-3" });
      const block4Mock = component.find({ ["data-test-id"]: "block-4" });
      const block5Mock = component.find({ ["data-test-id"]: "block-5" });

      expect(block1Mock.hasClass('block-1')).toEqual(true);
      expect(block2Mock.hasClass('block-2')).toEqual(true);
      expect(block3Mock.hasClass('block-3')).toEqual(true);
      expect(block4Mock.hasClass('block-4')).toEqual(true);
      expect(block5Mock.hasClass('block-5')).toEqual(true);
    });
  });

  describe('selected block', () => {
    it('should is rendered', () => {
      const mockedSelectedBlock = component.find({ ["data-test-id"]: "selected-block" });
      expect(mockedSelectedBlock.length).toEqual(1);
    });

    it('should is rendered with the correct class', () => {
      mockSelectedBlock(3);

      const mockedSelectedBlock = component.find({ ["data-test-id"]: "selected-block" });
      
      expect(mockedSelectedBlock.hasClass('block-3')).toEqual(true);
    });
  });

  describe('tower one', () => {
    it('should call selectMoveOrDeselectBlock with the right argument, if clicked', () => {
      const mockedTower1 = component.find({ ["data-test-id"]: "tower-one" });

      component.instance().selectMoveOrDeselectBlock = jest.fn();
      mockedTower1.prop('onClick')();

      expect(component.instance().selectMoveOrDeselectBlock).toHaveBeenCalledWith(tower1);
    });
  });

  describe('tower two', () => {
    it('should call selectMoveOrDeselectBlock with the right argument, if clicked', () => {
      const mockedTower2 = component.find({ ["data-test-id"]: "tower-two" });

      component.instance().selectMoveOrDeselectBlock = jest.fn();
      mockedTower2.prop('onClick')();

      expect(component.instance().selectMoveOrDeselectBlock).toHaveBeenCalledWith(tower2);
    });
  });

  describe('tower three', () => {
    it('should call selectMoveOrDeselectBlock with the right argument, if clicked', () => {
      const mockedTower3 = component.find({ ["data-test-id"]: "tower-three" });

      component.instance().selectMoveOrDeselectBlock = jest.fn();
      mockedTower3.prop('onClick')();

      expect(component.instance().selectMoveOrDeselectBlock).toHaveBeenCalledWith(tower3);
    });
  });
});
