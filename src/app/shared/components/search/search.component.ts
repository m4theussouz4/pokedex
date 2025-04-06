import { Component } from '@angular/core';
import { AppFacade } from '../../../+state/app.facade';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'poke-search',
  imports: [ReactiveFormsModule, TranslocoModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  public search: FormControl = new FormControl('');

  constructor(private appFacade: AppFacade){}

  searchPokemon() {
    this.appFacade.searchPokemon(this.search.value);
  }
}
