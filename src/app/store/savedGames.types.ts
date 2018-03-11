import {Action} from '@ngrx/store';
import {Grid} from './grid.types';
import {Game} from '../services/game.service.types';

/**
 * Save the list of games to the state.
 */
export class RefreshGames implements Action {
  static readonly TYPE = 'REFRESH_GAMES';
  readonly type = RefreshGames.TYPE;

  constructor(public games: Array<Game>) {
  }
}

/**
 * Action to load a game.
 */
export class LoadGame implements Action {
  static readonly TYPE = 'LOAD_GAME';
  readonly type = LoadGame.TYPE;

  constructor(public id: number) {
  }
}

/**
 * Action to delete a game. This will be called to update the store locally while at the
 * same time the server will be notified of the deleted game.
 */
export class DeleteGame implements Action {
  static readonly TYPE = 'DELETE_GAME';
  readonly type = DeleteGame.TYPE;

  constructor(public id: number) {
  }
}

/**
 * The available saved games actions.
 */
export type SavedGamesAction = LoadGame | DeleteGame | RefreshGames;

/**
 * The grid state.
 */
export interface SavedGamesState {
  games: Array<Game>;
  loadedGame?: Game;
}
