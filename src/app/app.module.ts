import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {gridReducer} from './store/grid';
import {GridState} from './store/grid.types';
import {savedGamesReducer} from './store/savedGames';
import {SavedGamesState} from './store/savedGames.types';
import {HttpClientModule} from '@angular/common/http';
import {GameService} from './services/game.service';

export interface AppState {
  grid: GridState;
  savedGames: SavedGamesState;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      grid: gridReducer,
      savedGames: savedGamesReducer
    })
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
