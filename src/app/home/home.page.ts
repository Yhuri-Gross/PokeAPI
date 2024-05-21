import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemonList: any[] = [];

  constructor(private pokemonService: PokemonService) { }

  async ngOnInit() {
    this.pokemonList = await this.pokemonService.getPokemonList();
  }
}
