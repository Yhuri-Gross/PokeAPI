import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 10, offset: number = 0): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetails(name: string): Observable<Pokemon> {
    return this.http.get<any>(`${this.apiUrl}/pokemon/${name}`).pipe(
      map(response => new Pokemon(response))
    );
  }

  getPokemonDetailsByUrl(url: string): Observable<Pokemon> {
    return this.http.get<any>(url).pipe(
      map(response => new Pokemon(response))
    );
  }

  getPokemonListWithDetails(limit: number = 10, offset: number = 0): Observable<Pokemon[]> {
    return this.getPokemonList(limit, offset).pipe(
      mergeMap(response => {
        const requests: Observable<Pokemon>[] = response.results.map((pokemon: { name: string, url: string }) =>
          this.getPokemonDetailsByUrl(pokemon.url)
        );
        return forkJoin(requests);
      })
    );
  }
}
