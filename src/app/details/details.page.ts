import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { FavoriteService } from '../services/favorite.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  pokemon: any;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private favoriteService: FavoriteService,
    private location: Location
  ) { }

  async ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemon = await this.pokemonService.getPokemonDetails(name).toPromise();
      this.favoriteService.getFavorites().subscribe(favorites => {
        this.isFavorite = favorites.includes(name);
      });
    } else {
      console.error('Nome do Pokémon não encontrado na URL.');
    }
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.favoriteService.removeFavorite(this.pokemon.name).subscribe(() => {
        this.isFavorite = false;
      });
    } else {
      this.favoriteService.addFavorite(this.pokemon.name).subscribe(() => {
        this.isFavorite = true;
      });
    }
  }

  
  goBack(): void {
    this.location.back();
  }

  getTypeClass(type: string): string {
    return `type-${type.toLowerCase()}`;
  }
  
}
