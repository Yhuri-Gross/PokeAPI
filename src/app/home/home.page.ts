import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: Pokemon[] = [];
  limit: number = 10;
  offset: number = 0;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(event?: any) {
    this.pokemonService.getPokemonListWithDetails(this.limit, this.offset).subscribe({
      next: (data) => {
        this.pokemons = this.pokemons.concat(data);
        if (event) {
          event.target.complete();
        }
      },
      error: (err) => console.error('Erro ao carregar a lista de Pokémon', err)
    });
  }

  loadMore(event: any) {
    this.offset += this.limit;
    this.loadPokemons(event);
  }
}