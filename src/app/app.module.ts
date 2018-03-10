import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {gridReducer} from './store/grid';
import {GridState} from './store/grid.types';
import {HttpClientModule} from '@angular/common/http';
import {GameService} from './services/game.service';

export interface AppState {
  grid: GridState;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({grid: gridReducer})
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
