import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {
  favoritePokemons: { name: string, image: string }[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private location: Location
  ) { }

  ngOnInit() {
    this.favoriteService.getFavoriteDetails().subscribe(favorites => {
      this.favoritePokemons = favorites;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
