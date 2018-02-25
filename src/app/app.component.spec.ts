import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {Store, StoreModule} from '@ngrx/store';
import {gridReducer} from './store/grid';
import {AppState} from './app.module';
import {AddDisc, ResetGame} from './store/grid.types';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        StoreModule.forRoot({grid: gridReducer})
      ],
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app component and start with player 1', async(() => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toContain('Player 1\'s Turn');
  }));

  it('should call addDisc() when a column is clicked', async(() => {
    fixture.debugElement.query(By.css('#column-1-row-0')).triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith(new AddDisc(1));
      // also check if the class for the cell has been updated
    });
  }));

  it('should call resetGame() when a the reset button is clicked', async(() => {
    fixture.debugElement.query(By.css('.reset-button')).triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      expect(store.dispatch).toHaveBeenCalledWith(new ResetGame());
    });
  }));

  it('should show a winner when the game is over', async(() => {
    fixture.debugElement.query(By.css('#column-1-row-0')).triggerEventHandler('click', null);
    fixture.debugElement.query(By.css('#column-1-row-0')).triggerEventHandler('click', null);
    fixture.debugElement.query(By.css('#column-2-row-0')).triggerEventHandler('click', null);
    fixture.debugElement.query(By.css('#column-2-row-0')).triggerEventHandler('click', null);
    fixture.debugElement.query(By.css('#column-3-row-0')).triggerEventHandler('click', null);
    fixture.debugElement.query(By.css('#column-3-row-0')).triggerEventHandler('click', null);
    fixture.debugElement.query(By.css('#column-4-row-0')).triggerEventHandler('click', null);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toContain('Player 1 has won');
    });
  }));
});
