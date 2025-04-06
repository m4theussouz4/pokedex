export enum PokemonStatistic {
    HP = 'hp',
    ATK = 'attack',
    DEF = 'defense',
    SpA = 'special-attack',
    SpD = 'special-defense',
    SPD = 'speed',
    TOT = 'total',
};

export const PokemonStatisticLabels = {
    [PokemonStatistic.HP]: 'HP',
    [PokemonStatistic.ATK]: 'ATK',
    [PokemonStatistic.DEF]: 'DEF',
    [PokemonStatistic.SpA]: 'SpA',
    [PokemonStatistic.SpD]: 'SpD',
    [PokemonStatistic.SPD]: 'SPD',
    [PokemonStatistic.TOT]: 'TOT',
}

export const PokemonStatisticColors = {
    [PokemonStatistic.HP]: 'var(--color-hp)',
    [PokemonStatistic.ATK]: 'var(--color-atk)',
    [PokemonStatistic.DEF]: 'var(--color-def)',
    [PokemonStatistic.SpA]: 'var(--color-spa)',
    [PokemonStatistic.SpD]: 'var(--color-spd)',
    [PokemonStatistic.SPD]: 'var(--color-speed)',
    [PokemonStatistic.TOT]: 'var(--color-tot)',
}

export enum PokemonTypes {
    normal = 'normal',
    fighting = 'fighting',
    flying = 'flying',
    poison = 'poison',
    ground = 'ground',
    rock = 'rock',
    bug = 'bug',
    ghost = 'ghost',
    steel = 'steel',
    fire = 'fire',
    water = 'water',
    grass = 'grass',
    electric = 'electric',
    psychic = 'psychic',
    ice = 'ice',
    dragon = 'dragon',
    dark = 'dark',
    fairy = 'fairy',
};

export const PokemonTypesColors = {
    [PokemonTypes.normal]: 'var(--color-normal)',
    [PokemonTypes.fighting]: 'var(--color-fighting)',
    [PokemonTypes.flying]: 'var(--color-flying)',
    [PokemonTypes.poison]: 'var(--color-poison)',
    [PokemonTypes.ground]: 'var(--color-ground)',
    [PokemonTypes.rock]: 'var(--color-rock)',
    [PokemonTypes.bug]: 'var(--color-bug)',
    [PokemonTypes.ghost]: 'var(--color-ghost)',
    [PokemonTypes.steel]: 'var(--color-steel)',
    [PokemonTypes.fire]: 'var(--color-fire)',
    [PokemonTypes.water]: 'var(--color-water)',
    [PokemonTypes.grass]: 'var(--color-grass)',
    [PokemonTypes.electric]: 'var(--color-electric)',
    [PokemonTypes.psychic]: 'var(--color-psychic)',
    [PokemonTypes.ice]: 'var(--color-ice)',
    [PokemonTypes.dragon]: 'var(--color-dragon)',
    [PokemonTypes.dark]: 'var(--color-dark)',
    [PokemonTypes.fairy]: 'var(--color-fairy)',
}

export interface PokemonList {
    count: number,
    next: string,
    previous: string,
    results: PokemonInfo[],
}

export interface PokemonInfo {
    id: number,
    name: string,
    url?: string,
    base_experience: number,
    height: number,
    weight: number,
    img: string,
    abilities: {
        is_hidden: boolean,
        slot: number,
        ability: {
            name: string,
            url: string,
        },
    }[],
    stats: {
        base_stat: number,
        effort: number,
        stat: {
            name: string,
            url: string,
        },
    }[],
    types: {
        slot: number,
        type: {
            name: string,
            url: string,
        },
    }[],
}