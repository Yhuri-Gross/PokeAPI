import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DetailsPage } from './details.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonService } from '../services/pokemon.service';
import { of } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

describe('DetailsPage', () => {
  let component: DetailsPage;
  let fixture: ComponentFixture<DetailsPage>;
  let pokemonService: PokemonService;
  const mockPokemon = new Pokemon({
    name: 'bulbasaur',
    sprites: { front_default: 'url' },
    height: 7,
    weight: 69,
    base_experience: 64,
    abilities: [{ ability: { name: 'overgrow' } }],
    types: [{ type: { name: 'grass' } }]
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsPage],
      imports: [HttpClientTestingModule],
      providers: [
        PokemonService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'bulbasaur' } },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPage);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);
    spyOn(pokemonService, 'getPokemonDetails').and.returnValue(of(mockPokemon));
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir detalhes do Pokémon', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ion-card-title').textContent).toContain('bulbasaur');
    expect(compiled.querySelector('img').src).toContain('url');
  });
});
