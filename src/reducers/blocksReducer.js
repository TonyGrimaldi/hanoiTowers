import {
  SET_DIFFICULTY_EASY,
  SET_DIFFICULTY_NORMAL,
  SET_DIFFICULTY_HARD,
  RESTART_GAME,
} from '../actions/constants';

const initialState = {
  blocks: []
};

export const initial3BlocksArray = [3, 2, 1];
export const initial4BlocksArray = [4, 3, 2, 1];
export const initial5BlocksArray = [5, 4, 3, 2, 1];

export default function(state = initialState, action) {
  switch (action.type) {
    case RESTART_GAME:
      return initialState;

    case SET_DIFFICULTY_EASY:
      return {
        ...state,
        blocks: [...initial3BlocksArray] 
      };

    case SET_DIFFICULTY_NORMAL:
      return {
        ...state,
        blocks: [...initial4BlocksArray]
      };
    
    case SET_DIFFICULTY_HARD:
    return {
      ...state,
      blocks: [...initial5BlocksArray]
    };

    default:
      return state;
  }
}
