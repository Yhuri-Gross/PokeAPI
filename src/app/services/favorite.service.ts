import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoritePokemons = new BehaviorSubject<string[]>(this.loadFavorites());

  constructor(private http: HttpClient) { }

  getFavorites(): Observable<string[]> {
    return this.favoritePokemons.asObservable();
  }

  getFavoriteDetails(): Observable<any[]> {
    return this.favoritePokemons.pipe(
      switchMap(favorites => {
        const requests = favorites.map(name => 
          this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        );
        return forkJoin(requests);
      }),
      map(pokemons => pokemons.map((pokemon: any) => ({
        name: pokemon.name,
        image: pokemon.sprites.front_default
      })))
    );
  }

  addFavorite(pokemon: string): Observable<void> {
    return new Observable<void>(observer => {
      const favorites = this.loadFavorites();
      if (!favorites.includes(pokemon)) {
        favorites.push(pokemon);
        this.saveFavorites(favorites);
        this.favoritePokemons.next(favorites);
      }
      observer.next();
      observer.complete();
    });
  }

  removeFavorite(pokemon: string): Observable<void> {
    return new Observable<void>(observer => {
      const favorites = this.loadFavorites();
      const index = favorites.indexOf(pokemon);
      if (index > -1) {
        favorites.splice(index, 1);
        this.saveFavorites(favorites);
        this.favoritePokemons.next(favorites);
      }
      observer.next();
      observer.complete();
    });
  }

  private loadFavorites(): string[] {
    const favoritesString = localStorage.getItem('favoritePokemons');
    if (favoritesString !== null) {
      return JSON.parse(favoritesString);
    } else {
      return [];
    }
  }

  private saveFavorites(favorites: string[]) {
    localStorage.setItem('favoritePokemons', JSON.stringify(favorites));
  }
}
