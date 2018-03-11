import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {GameService} from './game.service';

describe('GameService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let gameService: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    gameService = new GameService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('getAllGames gets all games', () => {
    const mockGames = [{winningPlayer: 0, numberOfTurns: 1, grid: []}];

    gameService.getAllGames()
      .subscribe(data => {
        expect(data).toEqual(mockGames);
      });

    const req = httpTestingController.expectOne(`${environment.gameServer}/api/games`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockGames);

    httpTestingController.verify();
  });

  it('getGame gets the specified game', () => {
    const mockGame = {winningPlayer: 0, numberOfTurns: 1, grid: []};

    gameService.getGame(1)
      .subscribe(data => {
        expect(data).toEqual(mockGame);
      });

    const req = httpTestingController.expectOne(`${environment.gameServer}/api/game/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockGame);

    httpTestingController.verify();
  });

  it('saveGame posts the specified game', () => {
    const mockGame = {winningPlayer: 0, numberOfTurns: 2, grid: []};

    gameService.saveGame(0, 2, [])
      .subscribe(data => {
        expect(data).toEqual(mockGame);
      });

    const req = httpTestingController.expectOne(`${environment.gameServer}/api/game`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockGame);
    req.flush(mockGame);

    httpTestingController.verify();
  });

  it('deleteGame deletes the specified game', () => {
    const mockGame = {winningPlayer: 0, numberOfTurns: 2, grid: []};

    gameService.deleteGame(1).subscribe();

    const req = httpTestingController.expectOne(`${environment.gameServer}/api/game/1`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockGame);

    httpTestingController.verify();
  });

});
