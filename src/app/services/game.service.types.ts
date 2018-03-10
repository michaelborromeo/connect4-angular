import {Grid} from '../store/grid.types';

/**
 * Data for a game.
 */
export interface Game {
  id?: number;
  timestamp?: Date;
  winningPlayer: number;
  numberOfTurns: number;
  grid: Grid;
}
