import { of } from "rxjs";
import { PokemonService } from "./pokemon.service";

describe('PokemonService', () => {
    let service: PokemonService;
    let httpMock: { get: jest.Mock };

    beforeEach(() => {
        httpMock = { get: jest.fn() };
        service = new PokemonService(httpMock as any);
    });

    it('should change the message', (done) => {
        const newMessage = 'Hello, Pokemon!';
        service.currentMessage.subscribe((message) => {
            expect(message).toBe(newMessage);
            done();
        });
        service.changeMessage(newMessage);
    });

    it('should fetch all Pokemon with default limit', () => {
        const mockResponse = { results: [] };
        httpMock.get.mockReturnValueOnce(of(mockResponse));

        service.getAll(0).subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        expect(httpMock.get).toHaveBeenCalledWith('pokemon?offset=0&limit=100');
    });

    it('should fetch all Pokemon with custom limit', () => {
        const mockResponse = { results: [] };
        httpMock.get.mockReturnValueOnce(of(mockResponse));

        service.getAll(0, 50).subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        expect(httpMock.get).toHaveBeenCalledWith('pokemon?offset=0&limit=50');
    });

    it('should fetch Pokemon by ID and map the response', () => {
        const mockResponse = {
            abilities: [],
            base_experience: 64,
            height: 7,
            weight: 69,
            id: 1,
            name: 'bulbasaur',
            sprites: { other: { dream_world: { front_default: 'image_url' } } },
            stats: [],
            types: []
        };
        const expectedResponse = {
            abilities: [],
            base_experience: 64,
            height: 7,
            weight: 69,
            id: 1,
            name: 'bulbasaur',
            img: 'image_url',
            stats: [],
            types: []
        };
        httpMock.get.mockReturnValueOnce(of(mockResponse));

        service.getById(1).subscribe((response) => {
            expect(response).toEqual(expectedResponse);
        });

        expect(httpMock.get).toHaveBeenCalledWith('pokemon/1');
    });

    it('should fetch weaknesses by type ID and map the response', () => {
        const mockResponse = {
            name: 'fire',
            damage_relations: {
                double_damage_from: [{ name: 'water' }, { name: 'rock' }]
            }
        };
        const expectedResponse = {
            name: 'fire',
            weaknesses: ['water', 'rock']
        };
        httpMock.get.mockReturnValueOnce(of(mockResponse));

        service.getWeaknesses(10).subscribe((response) => {
            expect(response).toEqual(expectedResponse);
        });

        expect(httpMock.get).toHaveBeenCalledWith('type/10');
    });

    it('should fetch Pokemon by type ID and map the response', () => {
        const mockResponse = {
            pokemon: [
                { pokemon: { name: 'charmander', url: 'url1' } },
                { pokemon: { name: 'vulpix', url: 'url2' } }
            ]
        };
        const expectedResponse = [
            { name: 'charmander', url: 'url1' },
            { name: 'vulpix', url: 'url2' }
        ];
        httpMock.get.mockReturnValueOnce(of(mockResponse));

        service.getByType(10).subscribe((response) => {
            expect(response).toEqual(expectedResponse);
        });

        expect(httpMock.get).toHaveBeenCalledWith('type/10');
    });
});