import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TranslocoService } from '@jsverse/transloco';
import { AppFacade } from '../../+state/app.facade';
import { of } from 'rxjs';
import { getTranslocoModule } from '../../core/transloco/transloco-testing.module';
import { pokemonCardDataMock } from '../../shared/mocks/pokemon.mock';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, getTranslocoModule()],
      providers: [
        TranslocoService,
        {
          provide: AppFacade,
          useValue: {
            pokemonList$: of([pokemonCardDataMock]),
            pokemonSelected$: of(null),
            hasNext$: of(false),
            loaded$: of(true),
            isFilteredList$: of(false),
            selectPokemon: () => {},
            loadPokemonList: () => {},
            filterByType: () => {},
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectPokemon on AppFacade with the correct pokemon', () => {
    const pokemonMock = { id: 1, name: 'Pikachu', stats: [] } as any;
    const appFacadeSpy = jest.spyOn(TestBed.inject(AppFacade), 'selectPokemon');

    component.selectPokemon(pokemonMock);

    expect(appFacadeSpy).toHaveBeenCalledWith(pokemonMock);
  });

  it('should open the modal if it is mobile and not is the first load', () => {
    const pokemonMock = { id: 1, name: 'Pikachu', stats: [] } as any;
    component.isMobile.set(true);
    const modalSpy = jest.spyOn(component.pokeModal, 'open');

    component.selectPokemon(pokemonMock, false);

    expect(modalSpy).toHaveBeenCalled();
  });

  it('should call loadPokemonList on AppFacade when onScroll is triggered', () => {
    const appFacadeSpy = jest.spyOn(TestBed.inject(AppFacade), 'loadPokemonList');

    component.onScroll();

    expect(appFacadeSpy).toHaveBeenCalled();
  });

  it('should call filterByType on AppFacade with the correct type', () => {
    const appFacadeSpy = jest.spyOn(TestBed.inject(AppFacade), 'filterByType');
    const mockEvent = { target: { value: 'Fire' } } as any;

    component.filterByType(mockEvent);

    expect(appFacadeSpy).toHaveBeenCalledWith('Fire');
  });

  it('should set the active language using TranslocoService', () => {
    const translocoServiceSpy = jest.spyOn(TestBed.inject(TranslocoService), 'setActiveLang');
    const language = 'es';

    component.setLanguage(language);

    expect(translocoServiceSpy).toHaveBeenCalledWith(language);
  });
});
