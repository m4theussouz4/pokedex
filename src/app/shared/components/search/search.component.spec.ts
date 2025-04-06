import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { getTranslocoModule } from '../../../core/transloco/transloco-testing.module';
import { AppFacade } from '../../../+state/app.facade';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, getTranslocoModule()],
      providers: [
        {
          provide: AppFacade,
          useValue: {
            searchPokemon: jest.fn(),
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call appFacade.searchPokemon with the correct value', () => {
    const searchValue = 'Pikachu';
    component.search.setValue(searchValue);

    component.searchPokemon();

    expect(component['appFacade'].searchPokemon).toHaveBeenCalledWith(searchValue);
  });
});
