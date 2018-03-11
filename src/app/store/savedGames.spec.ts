import {savedGamesReducer} from './savedGames';
import {Game} from '../services/game.service.types';
import {DeleteGame, LoadGame, RefreshGames} from './savedGames.types';

describe('savedGamesReducer', () => {
  it('should set the initial state', () => {
    const state = savedGamesReducer();

    expect(state.games.length).toEqual(0);
    expect(state.loadedGame).toBeNull();
  });

  it('should refresh the games list', () => {
    const games: Array<Game> = [{
      id: 1,
      timestamp: new Date(),
      winningPlayer: 0,
      numberOfTurns: 2,
      grid: []
    }];

    const state = savedGamesReducer();
    const newState = savedGamesReducer(state, new RefreshGames(games));

    expect(newState.games.length).toEqual(1);
    expect(newState.games[0]).toEqual(games[0]);
    expect(newState.loadedGame).toBeNull();
  });

  it('should load a game', () => {
    const games: Array<Game> = [{
      id: 1,
      timestamp: new Date(),
      winningPlayer: 0,
      numberOfTurns: 2,
      grid: []
    }, {
      id: 2,
      timestamp: new Date(),
      winningPlayer: 1,
      numberOfTurns: 5,
      grid: []
    }];

    const state = savedGamesReducer();
    const newState1 = savedGamesReducer(state, new RefreshGames(games));
    const newState2 = savedGamesReducer(newState1, new LoadGame(2));

    expect(newState2.loadedGame).toEqual(games[1]);
  });

  it('should delete a game', () => {
    const games: Array<Game> = [{
      id: 1,
      timestamp: new Date(),
      winningPlayer: 0,
      numberOfTurns: 2,
      grid: []
    }, {
      id: 2,
      timestamp: new Date(),
      winningPlayer: 1,
      numberOfTurns: 5,
      grid: []
    }];

    const state = savedGamesReducer();
    const newState1 = savedGamesReducer(state, new RefreshGames(games));
    const newState2 = savedGamesReducer(newState1, new DeleteGame(1));

    expect(newState2.games.length).toEqual(1);
    expect(newState2.games[0]).toEqual(games[1]);
  });
});
