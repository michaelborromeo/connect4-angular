import {GRID_COLUMNS, GRID_ROWS, gridReducer} from './grid';
import {AddDisc, ResetGame} from './grid.types';

describe('gridReducer', () => {
  it('should set the initial state', () => {
    const state = gridReducer();

    expect(state.grid.length).toEqual(GRID_COLUMNS);
    expect(state.grid[0].length).toEqual(GRID_ROWS);
    expect(state.turn).toEqual(0);
    expect(state.gameOver).toBeDefined();
    expect(state.gameOver).toBeFalsy();
  });

  it('should reset the state', () => {
    const initialState = gridReducer();
    const state = gridReducer(initialState, new ResetGame());

    expect(state.grid.length).toEqual(GRID_COLUMNS);
    expect(state.grid[0].length).toEqual(GRID_ROWS);
    expect(state.turn).toEqual(0);
    expect(state.gameOver).toBeDefined();
    expect(state.gameOver).toBeFalsy();
  });

  it('should add a disc', () => {
    const initialState = gridReducer();
    const state = gridReducer(initialState, new AddDisc(3));

    expect(state.grid[3][0].usedAtTurn).toEqual(0);
    expect(state.turn).toEqual(1);
    expect(state.gameOver).toBeDefined();
    expect(state.gameOver).toBeFalsy();
  });

  it('should add a few discs', () => {
    const initialState = gridReducer();
    const state1 = gridReducer(initialState, new AddDisc(3)); // player1
    const state2 = gridReducer(state1, new AddDisc(1)); // player2
    const state3 = gridReducer(state2, new AddDisc(3)); // player1

    expect(state3.grid[3][0].usedAtTurn).toEqual(0);
    expect(state3.grid[1][0].usedAtTurn).toEqual(1);
    expect(state3.grid[3][1].usedAtTurn).toEqual(2);
    expect(state3.turn).toEqual(3);
    expect(state3.gameOver).toBeDefined();
    expect(state3.gameOver).toBeFalsy();
  });

  it('should indicate a winning condition (vertical)', () => {
    const initialState = gridReducer();
    const state1 = gridReducer(initialState, new AddDisc(3)); // player1
    const state2 = gridReducer(state1, new AddDisc(1)); // player2
    const state3 = gridReducer(state2, new AddDisc(3)); // player1
    const state4 = gridReducer(state3, new AddDisc(1)); // player2
    const state5 = gridReducer(state4, new AddDisc(3)); // player1
    const state6 = gridReducer(state5, new AddDisc(1)); // player2
    const state7 = gridReducer(state6, new AddDisc(3)); // player1

    expect(state7.grid[3][0].usedAtTurn).toEqual(0);
    expect(state7.grid[1][0].usedAtTurn).toEqual(1);
    expect(state7.grid[3][1].usedAtTurn).toEqual(2);
    expect(state7.grid[1][1].usedAtTurn).toEqual(3);
    expect(state7.grid[3][2].usedAtTurn).toEqual(4);
    expect(state7.grid[1][2].usedAtTurn).toEqual(5);
    expect(state7.grid[3][3].usedAtTurn).toEqual(6);
    expect(state7.turn).toEqual(6);
    expect(state7.gameOver).toBeTruthy();
  });

  it('should indicate a winning condition (horizontal)', () => {
    const initialState = gridReducer();
    const state1 = gridReducer(initialState, new AddDisc(2)); // player1
    const state2 = gridReducer(state1, new AddDisc(1)); // player2
    const state3 = gridReducer(state2, new AddDisc(3)); // player1
    const state4 = gridReducer(state3, new AddDisc(1)); // player2
    const state5 = gridReducer(state4, new AddDisc(4)); // player1
    const state6 = gridReducer(state5, new AddDisc(1)); // player2
    const state7 = gridReducer(state6, new AddDisc(5)); // player1

    expect(state7.grid[2][0].usedAtTurn).toEqual(0);
    expect(state7.grid[1][0].usedAtTurn).toEqual(1);
    expect(state7.grid[3][0].usedAtTurn).toEqual(2);
    expect(state7.grid[1][1].usedAtTurn).toEqual(3);
    expect(state7.grid[4][0].usedAtTurn).toEqual(4);
    expect(state7.grid[1][2].usedAtTurn).toEqual(5);
    expect(state7.grid[5][0].usedAtTurn).toEqual(6);
    expect(state7.turn).toEqual(6);
    expect(state7.gameOver).toBeTruthy();
  });

  it('should indicate a winning condition (diagonal up)', () => {
    const initialState = gridReducer();
    const state1 = gridReducer(initialState, new AddDisc(2)); // player1
    const state2 = gridReducer(state1, new AddDisc(3)); // player2
    const state3 = gridReducer(state2, new AddDisc(3)); // player1
    const state4 = gridReducer(state3, new AddDisc(4)); // player2
    const state5 = gridReducer(state4, new AddDisc(4)); // player1
    const state6 = gridReducer(state5, new AddDisc(5)); // player2
    const state7 = gridReducer(state6, new AddDisc(4)); // player1
    const state8 = gridReducer(state7, new AddDisc(5)); // player2
    const state9 = gridReducer(state8, new AddDisc(0)); // player1
    const state10 = gridReducer(state9, new AddDisc(5)); // player2
    const state11 = gridReducer(state10, new AddDisc(5)); // player1

    expect(state11.grid[2][0].usedAtTurn).toEqual(0);
    expect(state11.grid[3][0].usedAtTurn).toEqual(1);
    expect(state11.grid[3][1].usedAtTurn).toEqual(2);
    expect(state11.grid[4][0].usedAtTurn).toEqual(3);
    expect(state11.grid[4][1].usedAtTurn).toEqual(4);
    expect(state11.grid[5][0].usedAtTurn).toEqual(5);
    expect(state11.grid[4][2].usedAtTurn).toEqual(6);
    expect(state11.grid[5][1].usedAtTurn).toEqual(7);
    expect(state11.grid[0][0].usedAtTurn).toEqual(8);
    expect(state11.grid[5][2].usedAtTurn).toEqual(9);
    expect(state11.grid[5][3].usedAtTurn).toEqual(10);
    expect(state11.turn).toEqual(10);
    expect(state11.gameOver).toBeTruthy();
  });

  it('should indicate a winning condition (diagonal down)', () => {
    const initialState = gridReducer();
    const state1 = gridReducer(initialState, new AddDisc(2)); // player1
    const state2 = gridReducer(state1, new AddDisc(3)); // player2
    const state3 = gridReducer(state2, new AddDisc(3)); // player1
    const state4 = gridReducer(state3, new AddDisc(4)); // player2
    const state5 = gridReducer(state4, new AddDisc(4)); // player1
    const state6 = gridReducer(state5, new AddDisc(5)); // player2
    const state7 = gridReducer(state6, new AddDisc(4)); // player1
    const state8 = gridReducer(state7, new AddDisc(5)); // player2
    const state9 = gridReducer(state8, new AddDisc(0)); // player1
    const state10 = gridReducer(state9, new AddDisc(5)); // player2
    const state11 = gridReducer(state10, new AddDisc(5)); // player1

    expect(state11.grid[2][0].usedAtTurn).toEqual(0);
    expect(state11.grid[3][0].usedAtTurn).toEqual(1);
    expect(state11.grid[3][1].usedAtTurn).toEqual(2);
    expect(state11.grid[4][0].usedAtTurn).toEqual(3);
    expect(state11.grid[4][1].usedAtTurn).toEqual(4);
    expect(state11.grid[5][0].usedAtTurn).toEqual(5);
    expect(state11.grid[4][2].usedAtTurn).toEqual(6);
    expect(state11.grid[5][1].usedAtTurn).toEqual(7);
    expect(state11.grid[0][0].usedAtTurn).toEqual(8);
    expect(state11.grid[5][2].usedAtTurn).toEqual(9);
    expect(state11.grid[5][3].usedAtTurn).toEqual(10);
    expect(state11.turn).toEqual(10);
    expect(state11.gameOver).toBeTruthy();
  });
});
