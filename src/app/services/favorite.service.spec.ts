import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FavoriteService } from './favorite.service';
import { of } from 'rxjs';

describe('FavoriteService', () => {
  let service: FavoriteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FavoriteService],
    });
    service = TestBed.inject(FavoriteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve adicionar um pokémon favorito', () => {
    const pokemonName = 'bulbasaur';
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');

    service.addFavorite(pokemonName).subscribe(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('favoritePokemons', JSON.stringify([pokemonName]));
    });
  });

  it('deve remover um pokémon favorito', () => {
    const pokemonName = 'bulbasaur';
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([pokemonName]));
    spyOn(localStorage, 'setItem');

    service.removeFavorite(pokemonName).subscribe(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('favoritePokemons', JSON.stringify([]));
    });
  });

  it('deve retornar a lista de pokémons favoritos', () => {
    const pokemonNames = ['bulbasaur', 'charmander'];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(pokemonNames));

    service.getFavorites().subscribe(favorites => {
      expect(favorites).toEqual(pokemonNames);
    });
  });

  it('deve retornar os detalhes dos pokémons favoritos', () => {
    const pokemonDetails = [
      { name: 'bulbasaur', sprites: { front_default: 'bulbasaur-image' } },
      { name: 'charmander', sprites: { front_default: 'charmander-image' } }
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(['bulbasaur', 'charmander']));

    service.getFavoriteDetails().subscribe(details => {
      expect(details).toEqual(pokemonDetails);
    });

    const requests = httpMock.match('https://pokeapi.co/api/v2/pokemon/');
    expect(requests.length).toBe(2);
    requests[0].flush(pokemonDetails[0]);
    requests[1].flush(pokemonDetails[1]);
  });
});
