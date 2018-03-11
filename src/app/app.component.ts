import {Component, Injectable} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {GRID_COLUMNS, GRID_ROWS} from './store/grid';
import {AddDisc, ResetGame, Grid, Cell} from './store/grid.types';
import {AppState} from './app.module';
import * as _ from 'lodash';
import {GameService} from './services/game.service';
import {Game} from './services/game.service.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  grid: Grid;
  gameOver: boolean;
  playerTurn: number;
  readonly rows: Array<number> = _.range(GRID_ROWS).reverse();
  readonly columns: Array<number> = _.range(GRID_COLUMNS);

  games: string;

  constructor(private store: Store<AppState>, private gameService: GameService) {
    store.pipe(select(this.selectState))
      .subscribe(this.updateState);

    gameService.getAllGames().subscribe(games => {
      this.games = JSON.stringify(games);
    }, error => {
      console.log(JSON.stringify(error))
    });

  }

  selectState = (state: AppState): any => {
    return {
      grid: state.grid.grid,
      gameOver: state.grid.gameOver,
      playerTurn: this.getPlayerNumber(state.grid.turn)
    };
  };

  updateState = (state: any): any => {
    this.grid = state.grid;
    this.gameOver = state.gameOver;
    this.playerTurn = state.playerTurn;
  };

  resetGame(): void {
    this.store.dispatch(new ResetGame());
  }

  addDisc(column: number): void {
    this.store.dispatch(new AddDisc(column));
  }

  getPlayerNumber(usedAtTurn: number) {
    return (usedAtTurn % 2) + 1;
  }

  getCell(column: number, row: number): Cell {
    return this.grid[column][row];
  }
}
