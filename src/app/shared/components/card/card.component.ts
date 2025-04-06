import { Component, input, output, InputSignal } from '@angular/core';
import { PokemonTypesColors } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'poke-card',
  imports: [CommonModule, TranslocoModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  public readonly cardData: InputSignal<any> = input.required<any>();

  public readonly selectedCard = output<any>();

  public readonly pokemonTypesColors = PokemonTypesColors;

  constructor() { }

  selectCard(card) {
    this.selectedCard.emit(card)
  }
}
