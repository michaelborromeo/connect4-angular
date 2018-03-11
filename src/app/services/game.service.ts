import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Grid} from '../store/grid.types';
import {Observable} from 'rxjs/Observable';
import {Game} from './game.service.types';
import {environment} from '../../environments/environment';

@Injectable()
export class GameService {
  constructor(private http: HttpClient) {
  }

  getAllGames(): Observable<Array<Game>> {
    return this.http.get<Array<Game>>(`${environment.gameServer}/api/games`);
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${environment.gameServer}/api/game/${id}`);
  }

  saveGame(winningPlayer: number, numberOfTurns: number, grid: Grid): Observable<Game> {
    const body: Game = {
      winningPlayer,
      numberOfTurns,
      grid
    };

    return this.http.post<Game>(`${environment.gameServer}/api/game`, body);
  }

  deleteGame(id: number): Observable<{}> {
    return this.http.delete(`${environment.gameServer}/api/game/${id}`);
  }
}
