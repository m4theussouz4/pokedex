import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { PokemonList, PokemonInfo } from "../../models/pokemon.model";

@Injectable({
    providedIn: 'root',
})
export class PokemonService {

    private messageSource = new BehaviorSubject("");
    currentMessage = this.messageSource.asObservable();

    constructor(private http: HttpClient) {}

    changeMessage(message: string) {
        this.messageSource.next(message)
    }

    getAll(offset: number, limit?: number): Observable<PokemonList> {
        return this.http.get<PokemonList>(`pokemon?offset=${offset}&limit=${limit ? limit : 100}`)
    };

    getById(id: number | string): Observable<PokemonInfo> {
        return this.http.get<any>(`pokemon/${id}`).pipe(
            map(data => (
                {
                    abilities: data.abilities,
                    base_experience: data.base_experience,
                    height: data.height,
                    weight: data.weight,
                    id: data.id,
                    name: data.name,
                    img: data.sprites.other.dream_world.front_default,
                    stats: data.stats,
                    types: data.types
                }
            ))
        )
    };

    getWeaknesses(id: number | string): Observable<any> {
        return this.http.get<any>(`type/${id}`).pipe(
            map(data => (
                {
                    name: data.name,
                    weaknesses: data.damage_relations.double_damage_from.map((weakness: any) => weakness.name)
                }
            ))
        )
    }

    getByType(id: number | string): Observable<any> {
        return this.http.get<any>(`type/${id}`).pipe(
            map(data => data.pokemon.map((pokemonData: any) => pokemonData.pokemon))
        )
    }

    // getSpecies(id: number | string): Observable<any> {
    //     return this.http.get<any>(`pokemon-species/${id}`).pipe(
    //         map(data => (
    //             {
    //                 description: data.flavor_text_entries[0].flavor_text,
    //                 evolutionChainUrl: data.evolution_chain.url
    //             }
    //         )
    //         )
    //     )
    // };

    // getEvolutionChain(id: number | string): Observable<any> {
    //     return this.http.get<any>(`evolution-chain/${id}`)
    // }
}