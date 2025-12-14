import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, switchMap } from "rxjs";
import { PokemonList, PokemonInfo, evolutionChain } from "../../models/pokemon.model";

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
            switchMap(data =>
                this.getSpecies(data.id).pipe(
                    map(species => ({
                        abilities: data.abilities,
                        base_experience: data.base_experience,
                        height: data.height,
                        weight: data.weight,
                        id: data.id,
                        name: data.name,
                        img: data.sprites.other.dream_world.front_default,
                        stats: data.stats,
                        types: data.types,
                        ...species,
                    }))
                )
            )
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

    private getSpecies(id: number | string): Observable<Partial<PokemonInfo>> {
        return this.http.get<any>(`pokemon-species/${id}`).pipe(
            switchMap(data =>
                this.getEvolutionChain(data.evolution_chain.url.split('/')[6]).pipe(
                    map(evolutionChain => ({
                        description: data.flavor_text_entries[0].flavor_text.replace(/\f/g, ' '),
                        evolutionChain,
                    }))
                )
            )
        )
    };

    private getEvolutionChain(id: number | string): Observable<evolutionChain> {
        return this.http.get<any>(`evolution-chain/${id}`).pipe(
            map(data => data.chain.evolves_to.length ? ({
                evolution0: {
                    id: data.chain.species.url.split('/')[6],
                    name: data.chain.species.name,
                    url: data.chain.species.url,
                    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.chain.species.url.split('/')[6]}.svg`,
                },
                evolution1: {
                    id: data.chain.evolves_to[0]?.species.url.split('/')[6] || null,
                    name: data.chain.evolves_to[0]?.species.name || null,
                    url: data.chain.evolves_to[0]?.species.url || null,
                    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.chain.evolves_to[0]?.species.url.split('/')[6]}.svg`,
                    min_level: data.chain.evolves_to[0]?.evolution_details[0]?.min_level || null,
                },
                evolution2: data.chain.evolves_to[0]?.evolves_to[0] ? {
                    id: data.chain.evolves_to[0]?.evolves_to[0]?.species.url.split('/')[6] || null,
                    name: data.chain.evolves_to[0]?.evolves_to[0]?.species.name || null,
                    url: data.chain.evolves_to[0]?.evolves_to[0]?.species.url || null,
                    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.chain.evolves_to[0]?.evolves_to[0]?.species.url.split('/')[6]}.svg`,
                    min_level: data.chain.evolves_to[0]?.evolves_to[0]?.evolution_details[0]?.min_level || null,
                } : null,
            }) : null)
        )
    }
}