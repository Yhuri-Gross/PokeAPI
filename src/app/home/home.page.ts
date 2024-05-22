import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemonList: any[] = [];
  limit: number = 20;
  offset: number = 0;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon(event?: Event) {
    this.pokemonService.getPokemonList(this.limit, this.offset).subscribe((response: any) => {
      this.pokemonList = this.pokemonList.concat(response.results);
      this.offset += this.limit;
      if (event) {
        (event as InfiniteScrollCustomEvent).target.complete();
      }
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.loadPokemon(event);
  }
}
