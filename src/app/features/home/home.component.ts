import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppFacade } from 'src/app/+state/app.facade';
import { PokemonInfo, PokemonTypes } from 'src/app/shared/models/pokemon.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public pokemonTypes;
  public readonly hasNext$: Observable<boolean>;
  public readonly loaded$: Observable<boolean>;
  public readonly isFilteredList$: Observable<boolean>;

  public pokemonSelected: PokemonInfo;
  public pokemonList: PokemonInfo[];
  public totalStats: number;

  constructor(private appFacade: AppFacade) {
    this.appFacade.pokemonList$.subscribe(pokemon => {
      this.pokemonList = pokemon;
      if(!this.pokemonSelected && pokemon) this.selectPokemon(pokemon[0]);
    });

    this.appFacade.pokemonSelected$.subscribe(pokemon => {
      this.pokemonSelected = pokemon;

      this.totalStats = pokemon?.stats.reduce((accumulator, object) => {
        return accumulator + object.base_stat;
      }, 0);
    });

    this.hasNext$ = this.appFacade.hasNextPage$;
    this.loaded$ = this.appFacade.loaded$;
    this.isFilteredList$ = this.appFacade.isFilteredList$;

    this.pokemonTypes = Object.keys(PokemonTypes);
  }

  selectPokemon(pokemon: PokemonInfo) {
    this.appFacade.selectPokemon(pokemon);
  }

  onScroll() {
    this.appFacade.loadPokemonList();
  }

  filterByType(type) {
    this.appFacade.filterByType(type.target.value);
  }

}
