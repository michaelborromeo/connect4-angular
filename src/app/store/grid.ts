import {
  AddDisc,
  Cell,
  Direction,
  Grid,
  GridAction,
  GridState,
  ResetGame
} from './grid.types';

export const GRID_ROWS = 6;
export const GRID_COLUMNS = 7;
const DISCS_NEEDED_FOR_WIN = 4;

const DIAGONAL_DOWN = 'diagonalDown';
const DIAGONAL_UP = 'diagonalUp';
const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal';

const DIRECTIONS: Direction[] = [
  {column: -1, row: -1, direction: DIAGONAL_DOWN},
  {column: 0, row: -1, direction: VERTICAL},
  {column: 1, row: -1, direction: DIAGONAL_UP},
  {column: 1, row: 0, direction: HORIZONTAL},
  {column: 1, row: 1, direction: DIAGONAL_DOWN},
  {column: 0, row: 1, direction: VERTICAL},
  {column: -1, row: 1, direction: DIAGONAL_UP},
  {column: -1, row: 0, direction: HORIZONTAL}
];

const initialState: GridState = {
  grid: createGrid(),
  turn: 0,
  gameOver: false
};

/**
 * The grid reducer.
 *
 * @param {GridState} state
 * @param {GridAction} action
 * @returns {GridState}
 */
export function gridReducer(state: GridState = initialState,
  action?: GridAction): GridState {

  if (!action) {
    return state;
  }

  switch (action.type) {
    case ResetGame.TYPE:
      return {
        ...initialState
      };

    case AddDisc.TYPE:
      if (state.gameOver) {
        return state;
      }

      // if no cell is returned then the column is full -- in this case do nothing
      const cell: Cell = findCellFromColumn(state.grid, action.column);
      if (!cell) {
        return state;
      }

      // create a new and updated grid (deep copy)
      const grid: Grid = createUpdatedGrid(state.grid, state.turn, cell);

      // find connected discs that satisfy the winning condition
      const gameOver = isGameOver(grid, cell, state.turn);

      return {
        grid,
        turn: gameOver ? state.turn : state.turn + 1,
        gameOver
      };

    default:
      return state;
  }
}

/**
 * Create a new blank grid, optionally copying over data from existing grid.
 *
 * @param {Grid} oldGrid
 * @returns {Grid}
 */
function createGrid(oldGrid?: Grid): Grid {
  const grid: Grid = [];

  for (let i = 0; i < GRID_COLUMNS; i++) {
    const column: Array<Cell> = [];

    for (let j = 0; j < GRID_ROWS; j++) {
      const cell: Cell = {
        column: i,
        row: j,
        // when a disc is placed in this cell, it will be marked with the turn it was
        // used
        // the player can be derived from the turn -- all even turns will be player 1,
        // and odd for 2
        usedAtTurn: -1
      };

      if (oldGrid) {
        // assuming oldGrid is of same size
        cell.usedAtTurn = oldGrid[i][j].usedAtTurn;
      }

      column.push(cell);
    }

    grid.push(column);
  }

  return grid;
}

/**
 * Find the next available cell in the column specified.
 *
 * @param {Grid} grid
 * @param {number} column
 * @returns {Cell}
 */
function findCellFromColumn(grid: Grid, column: number): Cell {
  for (let row = 0; row < GRID_ROWS; row++) {
    if (grid[column][row].usedAtTurn === -1) {
      return {
        column,
        row,
        usedAtTurn: -1
      };
    }
  }

  return null;
}

/**
 * Create a new grid with a new disc in the selected column.
 *
 * @param {Grid} oldGrid
 * @param {number} turn
 * @param {Cell} cell
 * @returns {Grid}
 */
function createUpdatedGrid(oldGrid: Grid, turn: number, cell: Cell): Grid {
  // create a new grid from the old grid so we're not mutating state
  const newGrid: Grid = createGrid(oldGrid);
  newGrid[cell.column][cell.row].usedAtTurn = turn;
  return newGrid;
}

/**
 * Check if any connected discs satisfy the winning condition.
 *
 * Starting with the last placed disc, search outwards until either a winning set is found
 * or there are no more paths to search.
 *
 * @param {Grid} grid
 * @param {Cell} cell
 * @param {number} turn
 * @returns {boolean}
 */
function isGameOver(grid: Grid, cell: Cell, turn: number): boolean {
  // each direction starts out with one disc (the last placed disc)
  const discCountsByDirection: any = {
    [DIAGONAL_DOWN]: 1,
    [DIAGONAL_UP]: 1,
    [HORIZONTAL]: 1,
    [VERTICAL]: 1
  };

  // tally up the adjacent cells that have discs belonging to the player
  for (let i = 0; i < DIRECTIONS.length; i++) {
    if (checkDirectionForWinner(grid, cell, turn, DIRECTIONS[i], discCountsByDirection)) {
      return true;
    }
  }

  return false;
}

/**
 * Check the specified direction for a disc matching the current disc.
 *
 * @param {Grid} grid
 * @param {Cell} cell
 * @param {number} turn
 * @param {Direction} direction
 * @param discCountsByDirection
 * @returns {boolean}
 */
function checkDirectionForWinner(grid: Grid, cell: Cell, turn: number,
  direction: Direction, discCountsByDirection: any): boolean {
  // get the coordinates for the cell we're checking
  const column: number = cell.column + direction.column;
  const row: number = cell.row + direction.row;

  // make sure we're inside the grid
  if (column < 0 || column >= GRID_COLUMNS || row < 0 || row >= GRID_ROWS) {
    return false;
  }

  // cell is empty?
  const adjacentCellTurn: number = grid[column][row].usedAtTurn;
  if (adjacentCellTurn === -1) {
    return false;
  }

  // player is the same?
  if (turn % 2 === adjacentCellTurn % 2) {
    // increment the counts for the current direction
    discCountsByDirection[direction.direction]++;

    // we have a winner yet?
    if (discCountsByDirection[direction.direction] === DISCS_NEEDED_FOR_WIN) {
      return true;
    }

    // recurse into this function with the adjacent cell as the new center going in the
    // same direction
    return checkDirectionForWinner(grid, {column, row, usedAtTurn: -1}, turn, direction,
      discCountsByDirection);
  }

  return false;
}
