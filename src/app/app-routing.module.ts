import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { HomePage } from './home/home.page';
import { DetailsPage } from './details/details.page'; 
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'favorites', component: FavoriteListComponent },
  { path: 'details/:name', component: DetailsPage }, 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
