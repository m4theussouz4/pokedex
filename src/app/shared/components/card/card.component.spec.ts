import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { pokemonCardDataMock } from '../../mocks/pokemon.mock';
import { getTranslocoModule } from '../../../core/transloco/transloco-testing.module';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, getTranslocoModule()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cardData', pokemonCardDataMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should emit the selected card when selectCard is called', () => {
    const card = { id: 1, name: 'Pikachu' };
    const emitSpy = jest.spyOn(component.selectedCard, 'emit');

    component.selectCard(card);

    expect(emitSpy).toHaveBeenCalledWith(card);
  });
});
