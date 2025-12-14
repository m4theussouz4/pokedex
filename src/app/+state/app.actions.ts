import { createAction, props } from '@ngrx/store';
import { PokemonInfo } from '../shared/models/pokemon.model';

export const setLoading = createAction(
  '[App] Set Loading'
);

export const loadPokemonList  = createAction(
  '[App] Load Pokemon List'
);

export const loadPokemonListSuccess = createAction(
  '[App] Load Pokemon List Success',
  props<{ pokemonList: PokemonInfo[], hasNext: boolean, offset: number }>()
);

export const loadPokemonListError = createAction(
  '[App] Load Pokemon List Error',
  props<{ error: any }>()
);

export const selectPokemon = createAction(
  '[App] Select Pokemon',
  props<{ pokemonInfo: PokemonInfo }>()
);

export const loadPokemonWeaknesses = createAction(
  '[App] Load Pokemon Weaknesses'
);

export const loadPokemonWeaknessesSucess = createAction(
  '[App] Load Pokemon Weaknesses Sucess',
  props<{ pokemonWeaknesses: { [key: string]: string[] } }>()
);

export const searchPokemon = createAction(
  '[App] Search Pokemon',
  props<{ search: string }>()
);

export const searchPokemonSucess = createAction(
  '[App] Search Pokemon Sucess',
  props<{ pokemonList: PokemonInfo[] }>()
);

export const searchPokemonError = createAction(
  '[App] Search Pokemon Error',
  props<{ error: any }>()
);

export const filterPokemonByType = createAction(
  '[App] Filter Pokemon By Type',
  props<{ pokemonType: string }>()
);

export const setIsFilteredList = createAction(
  '[App] Set Is Filtered List',
  props<{ isFilteredList: boolean }>()
)