import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  concat,
  concatMap,
  EMPTY,
  exhaustMap,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  range,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { PokemonService } from '../shared/services/pokemon/pokemon.service';
import * as AppActions from './app.actions';
import * as AppSelectors from './app.selectors'
import { AppState } from './app.reducer';
import { PokemonInfo } from '../shared/models/pokemon.model';

const POKEMON_BATCH_SIZE = 25;
const BATCHES_PER_LOAD = 4;
const POKEMON_PER_LOAD = POKEMON_BATCH_SIZE * BATCHES_PER_LOAD;

@Injectable()
export class AppEffects {

  loadPokemonList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadPokemonList),
      withLatestFrom(this.store.select(AppSelectors.getAppState)),
      exhaustMap(([_, pokemonState]) => {
        let nextOffset = pokemonState.currentOffset;
        let hasNext = pokemonState.hasNextPage;

        const initialActions = [
          AppActions.setLoading(),
          ...(Object.keys(pokemonState.pokemonWeaknesses).length
            ? []
            : [AppActions.loadPokemonWeaknesses()]),
        ];

        const batches$ = range(0, BATCHES_PER_LOAD).pipe(
          concatMap(() => {
            if (!hasNext) return EMPTY;

            return this.pokemonService.getAll(nextOffset, POKEMON_BATCH_SIZE).pipe(
              switchMap(data => {
                hasNext = data.next !== null;
                nextOffset += POKEMON_BATCH_SIZE;

                const pokemonDetails$ = data.results.length
                  ? forkJoin(
                      data.results.map(pokemon =>
                        this.pokemonService.getById(pokemon.name).pipe(
                          map(pokemonInfo => ({ ...pokemon, ...pokemonInfo }))
                        )
                      )
                    )
                  : of([]);

                return pokemonDetails$.pipe(
                  map(pokemonList =>
                    AppActions.loadPokemonListSuccess({
                      pokemonList,
                      hasNext,
                      offset: nextOffset,
                    })
                  )
                );
              })
            );
          })
        );

        return concat(
          from(initialActions),
          batches$,
          of(AppActions.loadPokemonListComplete())
        ).pipe(
          catchError(error => of(AppActions.loadPokemonListError({ error })))
        );
      })
    )
  );

  loadPokemonWeaknesses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadPokemonWeaknesses),
      mergeMap(async () => {

        let pokemonWeaknessesList: any[] = []

        for (let index = 1; index <= 18; index++) {
          await new Promise<void>((resolve) => {
            this.pokemonService.getWeaknesses(index).subscribe(pokemonWeaknesses => {
              pokemonWeaknessesList.push({ [pokemonWeaknesses.name]: pokemonWeaknesses.weaknesses });
              resolve();
            })
          })
        }

        var pokemonWeaknessesListClone = Object.assign({}, ...pokemonWeaknessesList);

        return AppActions.loadPokemonWeaknessesSucess({ pokemonWeaknesses: pokemonWeaknessesListClone });
      }),
    )
  );

  searchPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.searchPokemon),
      mergeMap(({ search }) => {
        if(search === '') {
          this.store.dispatch(AppActions.setIsFilteredList({ isFilteredList: false }));
          return of(this.store.dispatch(AppActions.searchPokemonSucess({ pokemonList: []})));
        }
        
        return this.pokemonService.getById(search).pipe(
          map(pokemonInfo => {
            this.store.dispatch(AppActions.selectPokemon({ pokemonInfo: pokemonInfo }));
            this.store.dispatch(AppActions.searchPokemonSucess({ pokemonList: [pokemonInfo]}));
          }),
          catchError(error => of(this.store.dispatch(AppActions.searchPokemonError(error))))
        )
      })
    ),
    { dispatch: false }
  );

  filterPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.filterPokemonByType),
      switchMap(({ pokemonType }) => {
        if(pokemonType === '') {
          return from([
            AppActions.setIsFilteredList({ isFilteredList: false }),
            AppActions.searchPokemonSucess({ pokemonList: [] }),
          ]);
        }

        return this.pokemonService.getByType(pokemonType).pipe(
          switchMap(data => {
            const pokemonList = data.slice(0, POKEMON_PER_LOAD);
            const batchCount = Math.ceil(pokemonList.length / POKEMON_BATCH_SIZE);

            const batches$ = range(0, batchCount).pipe(
              concatMap(batchIndex => {
                const batchStart = batchIndex * POKEMON_BATCH_SIZE;
                const pokemonBatch = pokemonList.slice(
                  batchStart,
                  batchStart + POKEMON_BATCH_SIZE
                );

                const pokemonDetails: Observable<PokemonInfo>[] = pokemonBatch.map(
                  (pokemon: PokemonInfo) =>
                    this.pokemonService.getById(pokemon.name).pipe(
                      map(pokemonInfo => (
                        { ...pokemon, ...pokemonInfo } as PokemonInfo
                      ))
                    )
                );

                return forkJoin(pokemonDetails).pipe(
                  map(batch =>
                    AppActions.filterPokemonBatchSuccess({ pokemonList: batch })
                  )
                );
              })
            );

            return concat(
              batches$,
              of(AppActions.filterPokemonComplete())
            );
          }),
          catchError(error => of(AppActions.searchPokemonError({ error })))
        )
      })
    )
  );

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    private store: Store<{
      app: AppState;
    }>
  ) { }

}
