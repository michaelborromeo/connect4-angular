import {
  DeleteGame,
  LoadGame,
  RefreshGames, SavedGamesAction, SavedGamesState,
  SaveGame
} from './savedGames.types';
import {Game} from '../services/game.service.types';

const initialState: SavedGamesState = {
  games: [],
  loadedGame: null
};

export function savedGamesReducer(state: SavedGamesState = initialState,
  action?: SavedGamesAction): SavedGamesState {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case RefreshGames.TYPE:

      return {
        games: action.games,
        loadedGame: state.loadedGame
      };

    case LoadGame.TYPE:
      // find the game to be loaded
      for (let i = 0; i < state.games.length; i++) {
        if (state.games[i].id === action.id) {
          return {
            games: [...state.games],
            loadedGame: state.games[i]
          };
        }
      }

      // can't find the game to load
      return {
        games: [...state.games],
        loadedGame: null
      };

    case DeleteGame.TYPE:
      // find the game to be deleted
      for (let i = 0; i < state.games.length; i++) {
        if (state.games[i].id === action.id) {
          // create a new array then modify it
          const games: Array<Game> = [...state.games];
          games.splice(i, 1);

          return {
            games,
            loadedGame: state.loadedGame
          };
        }
      }

      // can't find the game to delete
      return {
        games: [...state.games],
        loadedGame: state.loadedGame
      };

    default:
      return state;
  }
}
