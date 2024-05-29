import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteListComponent } from './favorite-list.component';
import { FavoriteService } from '../services/favorite.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';

describe('FavoriteListComponent', () => {
  let component: FavoriteListComponent;
  let fixture: ComponentFixture<FavoriteListComponent>;
  let favoriteService: jasmine.SpyObj<FavoriteService>;
  let location: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const favoriteServiceSpy = jasmine.createSpyObj('FavoriteService', ['getFavoriteDetails']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [ FavoriteListComponent ],
      providers: [
        { provide: FavoriteService, useValue: favoriteServiceSpy },
        { provide: Location, useValue: locationSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteListComponent);
    component = fixture.componentInstance;
    favoriteService = TestBed.inject(FavoriteService) as jasmine.SpyObj<FavoriteService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar a lista de pokemons favoritos corretamente', () => {
    const mockFavorites = [
      { name: 'bulbasaur', image: 'bulbasaur-image' },
      { name: 'charmander', image: 'charmander-image' }
    ];

    favoriteService.getFavoriteDetails.and.returnValue(of(mockFavorites));

    fixture.detectChanges();

    expect(component.favoritePokemons).toEqual(mockFavorites);
  });

  it('deve chamar o método goBack ao clicar no botão de voltar', () => {
    const backButton = fixture.debugElement.nativeElement.querySelector('.back-button');
    backButton.click();

    expect(location.back).toHaveBeenCalled();
  });
});
