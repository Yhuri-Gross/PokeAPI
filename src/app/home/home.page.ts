import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: Pokemon[] = [];
  limit: number = 6;
  offset: number = 0;
  totalResults: number = 0;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(event?: any) {
    this.pokemonService.getPokemonListWithDetails(this.limit, this.offset).subscribe({
      next: (data) => {
        this.pokemons = this.pokemons.concat(data);
        this.totalResults = data.length;
        if (event) {
          event.target.complete();
        }
      },
      error: (err) => console.error('Erro ao carregar a lista de Pokémon', err)
    });
  }

  loadMore() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  hasMoreResults(): boolean {
    return this.pokemons.length < this.totalResults;
  }

  goToDetails(pokemonName: string) {
    this.router.navigate(['/details', pokemonName]);
  }
}