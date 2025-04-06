import { Component, HostListener, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { AppFacade } from '../../../+state/app.facade';
import { PokemonStatisticLabels, PokemonStatisticColors, PokemonTypesColors, PokemonInfo } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'poke-card-info',
  imports: [CommonModule, TranslocoModule],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss'
})
export class CardInfoComponent {
  public readonly pokemonSelected: InputSignal<PokemonInfo> = input.required<PokemonInfo>();
  public readonly totalStats: InputSignal<number> = input<number>();

  public readonly pokemonStatisticLabels = PokemonStatisticLabels;
  public readonly pokemonStatisticColors = PokemonStatisticColors;
  public readonly pokemonTypesColors = PokemonTypesColors;

  public readonly pokemonWeaknesses$: Observable<{ [key: string]: string[] }>;

  public pokemonInfoFixed: WritableSignal<boolean> = signal<boolean>(false);

  constructor(private appFacade: AppFacade){
    this.pokemonWeaknesses$ = this.appFacade.pokemonWeaknesses$;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const scrollTop = ($event.target as Document).documentElement.scrollTop;
    this.pokemonInfoFixed.set(scrollTop >= window.innerHeight * 0.16);
  }
}
