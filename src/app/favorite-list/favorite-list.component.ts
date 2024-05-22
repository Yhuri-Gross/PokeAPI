import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {
  favoritePokemons: string[] = [];

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit() {
    this.favoriteService.getFavorites().subscribe(favorites => {
      this.favoritePokemons = favorites;
    });
  }
}
