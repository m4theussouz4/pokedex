export const pokemonCardDataMock = {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
    abilities: [
        {
            ability: {
                name: "overgrow",
                url: "https://pokeapi.co/api/v2/ability/65/"
            },
            is_hidden: false,
            slot: 1
        },
        {
            ability: {
                name: "chlorophyll",
                url: "https://pokeapi.co/api/v2/ability/34/"
            },
            is_hidden: true,
            slot: 3
        }
    ],
    base_experience: 64,
    height: 7,
    weight: 69,
    id: 1,
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
    stats: [
        {
            base_stat: 45,
            effort: 0,
            stat: {
                name: "hp",
                url: "https://pokeapi.co/api/v2/stat/1/"
            }
        },
        {
            base_stat: 49,
            effort: 0,
            stat: {
                name: "attack",
                url: "https://pokeapi.co/api/v2/stat/2/"
            }
        },
        {
            base_stat: 49,
            effort: 0,
            stat: {
                name: "defense",
                url: "https://pokeapi.co/api/v2/stat/3/"
            }
        },
        {
            base_stat: 65,
            effort: 1,
            stat: {
                name: "special-attack",
                url: "https://pokeapi.co/api/v2/stat/4/"
            }
        },
        {
            base_stat: 65,
            effort: 0,
            stat: {
                name: "special-defense",
                url: "https://pokeapi.co/api/v2/stat/5/"
            }
        },
        {
            base_stat: 45,
            effort: 0,
            stat: {
                name: "speed",
                url: "https://pokeapi.co/api/v2/stat/6/"
            }
        }
    ],
    types: [
        {
            slot: 1,
            type: {
                name: "grass",
                url: "https://pokeapi.co/api/v2/type/12/"
            }
        },
        {
            slot: 2,
            type: {
                name: "poison",
                url: "https://pokeapi.co/api/v2/type/4/"
            }
        }
    ]
}