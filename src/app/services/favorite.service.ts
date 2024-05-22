import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoritePokemons = new BehaviorSubject<string[]>(this.loadFavorites());

  constructor() { }

  getFavorites(): Observable<string[]> {
    return this.favoritePokemons.asObservable();
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
    console.log(favoritesString);
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
