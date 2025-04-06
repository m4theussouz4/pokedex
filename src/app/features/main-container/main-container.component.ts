import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppFacade } from '../../+state/app.facade';
import { PokemonService } from '../../shared/services/pokemon/pokemon.service';
import { ScannedActionsSubject } from '@ngrx/store';
import { searchPokemonError } from '../../+state/app.actions';
import { filter, Unsubscribable } from 'rxjs';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { translate } from '@jsverse/transloco';

@Component({
  selector: 'poke-main-container',
  imports: [RouterOutlet, ToastComponent],
  providers: [AppFacade, PokemonService],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent {

  private subscriber: Unsubscribable;

  constructor(
    private appFacade: AppFacade,
    private pokemonService: PokemonService,
    private actions$: ScannedActionsSubject
  ) {
    this.appFacade.loadPokemonList();

    this.subscriber = this.actions$.pipe(
      filter(action => action.type === searchPokemonError.type),
    ).subscribe((data: any) => {
      if (data?.message) {
        const message = translate('Pokemon not found');
        this.pokemonService.changeMessage(message);
      }
    })
  }
  
}
