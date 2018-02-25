import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {AppComponent} from './app.component';
import {gridReducer} from './store/grid';
import {GridState} from './store/grid.types';

export interface AppState {
  grid: GridState;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({grid: gridReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
