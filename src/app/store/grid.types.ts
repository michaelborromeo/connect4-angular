import {Action} from '@ngrx/store';

/**
 * The directions you can go in a 2d grid.
 */
export interface Direction {
  column: number;
  row: number;
  direction: string;
}

/**
 * Action to reset a game.
 */
export class ResetGame implements Action {
  static readonly TYPE = 'RESET_GAME';
  readonly type = ResetGame.TYPE;
}

/**
 * Action to add a disc.
 */
export class AddDisc implements Action {
  static readonly TYPE = 'ADD_DISC';
  readonly type = AddDisc.TYPE;

  constructor(public column: number) {
  }
}

/**
 * The available grid actions.
 */
export type GridAction = AddDisc | ResetGame;

/**
 * A grid cell.
 */
export interface Cell {
  column: number;
  row: number;
  usedAtTurn: number;
}

/**
 * The grid -- a 2d array of cells.
 */
export type Grid = Array<Array<Cell>>;

/**
 * The grid state.
 */
export interface GridState {
  grid: Grid;
  turn: number;
  gameOver: boolean;
}
