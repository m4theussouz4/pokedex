import { createReducer, on } from '@ngrx/store';
import { PokemonInfo } from '../shared/models/pokemon.model';

import * as AppActions from './app.actions';

export const APP_FEATURE_KEY = 'app';

export interface AppState {
  loaded: boolean;
  error?: string | null;
  isFilteredList: boolean;
  pokemonList: PokemonInfo[];
  pokemonListFirstCharge: PokemonInfo[];
  pokemonSelected: PokemonInfo | undefined;
  hasNextPage: boolean;
  currentOffset: number;
  pokemonWeaknesses: { [key: string]: string[] };
  pokemonSearchList: PokemonInfo[];
}

export const initialState: AppState = {
  loaded: false,
  isFilteredList: false,
  pokemonList: [],
  pokemonListFirstCharge: [],
  pokemonSelected: undefined,
  hasNextPage: true,
  currentOffset: 0,
  pokemonWeaknesses: {},
  pokemonSearchList: [],
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.loadPokemonListSuccess, (state, { pokemonList, hasNext, offset }) => ({ 
    ...state,
    pokemonList: [...state.pokemonList, ...pokemonList],
    hasNextPage: hasNext,
    loaded: true,
    currentOffset: offset,
    isFilteredList: false,
  })),

  on(AppActions.selectPokemon, (state, { pokemonInfo }) => ({ 
    ...state,
    pokemonSelected: pokemonInfo
  })),

  on(AppActions.loadPokemonWeaknessesSucess, (state, { pokemonWeaknesses }) => ({ 
    ...state,
    pokemonWeaknesses: pokemonWeaknesses
  })),

  on(AppActions.searchPokemon, (state) => ({
    ...state,
    loaded: false,
    isFilteredList: true,
  })),
  
  on(AppActions.searchPokemonSucess, (state, { pokemonList }) => ({ 
    ...state,
    pokemonSearchList: pokemonList,
    loaded: true
  })),

  on(AppActions.searchPokemonError, (state, { error }) => ({ 
    ...state,
    error: error,
    loaded: true,
  })),

  on(AppActions.filterPokemonByType, (state) => ({
    ...state,
    isFilteredList: true,
    loaded: false,
  })),

  on(AppActions.setIsFilteredList, (state, { isFilteredList }) => ({ 
    ...state,
    isFilteredList
  })),

  on(AppActions.setLoading, state => ({ 
    ...state,
    loaded: false
  })),
);
