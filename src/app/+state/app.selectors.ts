import { createFeatureSelector, createSelector } from '@ngrx/store';
import { APP_FEATURE_KEY, AppState } from './app.reducer';

export const getAppState = createFeatureSelector<AppState>(APP_FEATURE_KEY);

export const getPokemonList = createSelector(
    getAppState,
    (state: AppState) => state.pokemonSearchList.length ? state.pokemonSearchList : state.pokemonList
);

export const getpokemonWeaknesses = createSelector(
    getAppState,
    (state: AppState) => state.pokemonWeaknesses
);

export const getPokemonSelected = createSelector(
    getAppState,
    (state: AppState) => state.pokemonSelected
);

export const getHasNextPage = createSelector(
    getAppState,
    (state: AppState) => state.hasNextPage
);

export const getIsFilteredList = createSelector(
    getAppState,
    (state: AppState) => state.isFilteredList
);

export const getLoaded = createSelector(
    getAppState,
    (state: AppState) => state.loaded
);

export const getError = createSelector(
    getAppState,
    (state: AppState) => state.error
);