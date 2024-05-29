import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemon.model';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve recuperar uma lista de Pokémon', () => {
    const mockResponse = {
      results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }]
    };

    service.getPokemonList(10, 0).subscribe((response) => {
      expect(response.results.length).toBe(1);
      expect(response.results[0].name).toBe('bulbasaur');
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deve recuperar detalhes de um Pokémon', () => {
    const mockResponse = {
      name: 'bulbasaur',
      sprites: { front_default: 'some-url' },
      height: 7,
      weight: 69,
      base_experience: 64,
      abilities: [{ ability: { name: 'overgrow' } }],
      types: [{ type: { name: 'grass' } }]
    };

    service.getPokemonDetails('bulbasaur').subscribe((pokemon: Pokemon) => {
      expect(pokemon.name).toBe('bulbasaur');
      expect(pokemon.height).toBe(7);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/bulbasaur');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
