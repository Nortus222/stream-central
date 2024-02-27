import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FavoriteslistComponent } from './favoriteslist/favoriteslist.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  { path: '',  component: HomepageComponent },
  { path: 'movies',  component: MovieComponent },
  { path: 'movies/:movieId',  component: MovieComponent },
  { path: 'favorites',  component: FavoriteslistComponent },
  { path: 'favorites/:favoritesId',  component: MovieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
