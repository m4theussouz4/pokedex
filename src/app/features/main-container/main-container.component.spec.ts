import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MainContainerComponent } from './main-container.component';
import { AppFacade } from '../../+state/app.facade';
import { PokemonService } from '../../shared/services/pokemon/pokemon.service';
import { ScannedActionsSubject, StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { searchPokemonError } from '../../+state/app.actions';
import { getTranslocoModule } from '../../core/transloco/transloco-testing.module';
import { TranslocoService } from '@jsverse/transloco';

describe('MainContainerComponent', () => {
  let component: MainContainerComponent;
  let fixture: ComponentFixture<MainContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainContainerComponent,
        HttpClientModule,
        StoreModule.forRoot({}),
        getTranslocoModule()
      ],
      providers: [
        TranslocoService,
        {
          provide: PokemonService,
          useValue: {
            changeMessage: jest.fn(),
          }
        },
        {
          provide: AppFacade,
          useValue: {
            loadPokemonList: jest.fn(),
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadPokemonList in the constructor', () => {
    const loadPokemonListSpy = jest.spyOn(component['appFacade'], 'loadPokemonList');

    const actions$ = TestBed.inject(ScannedActionsSubject);
    actions$.next({ type: searchPokemonError.type, message: 'Error message' } as any);

    new MainContainerComponent(
      component['appFacade'],
      component['pokemonService'],
      component['actions$']
    );

    expect(loadPokemonListSpy).toHaveBeenCalled();
  });

});
