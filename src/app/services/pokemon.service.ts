// src/app/services/pokemon.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor() { }

  async getPokemonList(limit: number = 6) {
    const response = await axios.get(`${this.apiUrl}/pokemon?limit=${limit}`);
    return response.data.results;
  }

  async getPokemonDetails(name: string) {
    const response = await axios.get(`${this.apiUrl}/pokemon/${name}`);
    return response.data;
  }
}
