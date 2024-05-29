import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonService } from '../services/pokemon.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HomePage } from './home.page';
import { Pokemon } from '../models/pokemon.model';

describe('ListPage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let pokemonService: PokemonService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [PokemonService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir uma lista de Pokémon', () => {
    const mockPokemons = [
      new Pokemon({
        name: 'bulbasaur',
        sprites: { front_default: 'url' },
        types: [{ type: { name: 'grass' } }]
      }),
      new Pokemon({
        name: 'charmander',
        sprites: { front_default: 'url' },
        types: [{ type: { name: 'fire' } }]
      }),
    ]
    spyOn(pokemonService, 'getPokemonListWithDetails').and.returnValue(of(mockPokemons));

    component.loadPokemons();
    fixture.detectChanges();

    const pokemonElements = fixture.debugElement.queryAll(By.css('ion-item'));
    expect(pokemonElements.length).toBe(1);
    expect(pokemonElements[0].nativeElement.textContent).toContain('bulbasaur');
  });

  it('deve chamar goToDetails quando um Pokémon é clicado', () => {
    spyOn(component, 'goToDetails');

    const mockPokemons = [
      new Pokemon({
        name: 'bulbasaur',
        sprites: { front_default: 'url' },
        types: [{ type: { name: 'grass' } }]
      }),
      new Pokemon({
        name: 'charmander',
        sprites: { front_default: 'url' },
        types: [{ type: { name: 'fire' } }]
      }),
    ]
    spyOn(pokemonService, 'getPokemonListWithDetails').and.returnValue(of(mockPokemons));

    component.loadPokemons();
    fixture.detectChanges();

    const pokemonElement = fixture.debugElement.query(By.css('ion-item'));
    pokemonElement.triggerEventHandler('click', null);

    expect(component.goToDetails).toHaveBeenCalledWith('bulbasaur');
  });
});
