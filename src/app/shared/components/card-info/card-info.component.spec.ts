import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoComponent } from './card-info.component';
import { getTranslocoModule } from '../../../core/transloco/transloco-testing.module';
import { pokemonCardDataMock } from '../../mocks/pokemon.mock';
import { AppFacade } from '../../../+state/app.facade';
import { of } from 'rxjs';

describe('CardInfoComponent', () => {
  let component: CardInfoComponent;
  let fixture: ComponentFixture<CardInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardInfoComponent, getTranslocoModule()],
      providers: [
        {
          provide: AppFacade,
          useValue: {
            pokemonWeaknesses$: of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CardInfoComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemonSelected', pokemonCardDataMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set pokemonInfoFixed to true when scrollTop is greater than or equal to 16% of window height', () => {
    const scrollEvent = {
      target: {
        documentElement: {
          scrollTop: window.innerHeight * 0.16
        }
      }
    } as unknown as Event;

    component.onWindowScroll(scrollEvent);
    expect(component.pokemonInfoFixed()).toBeTruthy();
  });

});
