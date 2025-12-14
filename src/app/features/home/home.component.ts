import { Component, HostListener, signal, ViewChild, WritableSignal } from '@angular/core';
import { Observable, Unsubscribable } from 'rxjs';
import { AppFacade } from '../../+state/app.facade';
import { PokemonInfo, PokemonTypes } from '../../shared/models/pokemon.model';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { CardInfoComponent } from '../../shared/components/card-info/card-info.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { Unsubscribe } from '../../core/decorators/unsubscribe.decorator';

@Unsubscribe()
@Component({
  selector: 'poke-home',
  imports: [
    CommonModule ,SearchComponent, CardComponent,
    LoaderComponent, CardInfoComponent, ModalComponent,
    InfiniteScrollDirective, TranslocoModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('pokeModal') pokeModal: ModalComponent;

  public readonly hasNext$: Observable<boolean>;
  public readonly loaded$: Observable<boolean>;
  public readonly isFilteredList$: Observable<boolean>;

  public pokemonSelected: WritableSignal<PokemonInfo> = signal<PokemonInfo | null>(null);
  public pokemonList: WritableSignal<PokemonInfo[]> = signal<PokemonInfo[]>([]);
  public pokemonTypes: WritableSignal<string[]> = signal<string[]>([]);
  public totalStats: WritableSignal<number> = signal<number | null>(null);
  public isMobile: WritableSignal<boolean> = signal<boolean>(false);

  private subscriber: Unsubscribable;

  constructor(
    private appFacade: AppFacade,
    private translocoService: TranslocoService,
  ) {
    this.onResize();

    this.subscriber = this.appFacade.pokemonList$.subscribe(pokemons => {
      this.pokemonList.set(pokemons);
      if(!this.pokemonSelected && pokemons) this.selectPokemon(pokemons[0], true);
    });

    this.subscriber = this.appFacade.pokemonSelected$.subscribe(pokemon => {
      this.pokemonSelected.set(pokemon);

      this.totalStats.set(
        pokemon?.stats.reduce((accumulator, object) => accumulator + object.base_stat, 0) || 0
      );
    });

    this.hasNext$ = this.appFacade.hasNextPage$;
    this.loaded$ = this.appFacade.loaded$;
    this.isFilteredList$ = this.appFacade.isFilteredList$;

    this.pokemonTypes.set(Object.keys(PokemonTypes));
  }

  @HostListener('window:resize', ['$event'])
  private onResize() {
    this.isMobile.set(window.innerWidth < 768);
    
  }

  selectPokemon(pokemon: PokemonInfo, firstLoad?: boolean) {
    this.appFacade.selectPokemon(pokemon);
    if(this.isMobile() && !firstLoad) this.pokeModal.open();
  }

  onScroll() {
    this.appFacade.loadPokemonList();
  }

  filterByType(type: any) {
    this.appFacade.filterByType(type.target.value);
  }

  setLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
