import {
  RESTART_GAME
} from './constants';

export const setDifficulty = (difficulty) => ({ type: difficulty });
export const restartGame = () => ({ type: RESTART_GAME });
