import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Grid} from '../store/grid.types';
import {Observable} from 'rxjs/Observable';
import {Game} from './game.service.types';

@Injectable()
export class GameService {
  private server: string;

  constructor(private http: HttpClient) {
    this.server = 'http://connect4-api-jaapp.2gqfhmf5ap.us-east-1.elasticbeanstalk.com';
  }

  getAllGames(): Observable<Array<Game>> {
    return this.http.get<Array<Game>>(`${this.server}/api/games`);
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.server}/api/game/${id}`);
  }

  saveGame(winningPlayer: number, numberOfTurns: number, grid: Grid): Observable<Game> {
    const body: Game = {
      winningPlayer,
      numberOfTurns,
      grid
    };

    return this.http.post<Game>(`${this.server}/api/game`, body);
  }

  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.server}/api/game/${id}`);
  }
}
