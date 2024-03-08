import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { FavoriteslistComponent } from './favoriteslist/favoriteslist.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { MoviesComponent } from './movies/movies.component';
import { TVShowsComponent } from './tvshows/tvshows.component';

const routes: Routes = [
  { path: '',  component: HomepageComponent },
  { path: 'content/:id', component: ContentDetailsComponent },
  { path: 'favorites',  component: FavoriteslistComponent },
  { path: 'movies', component: MoviesComponent},
  { path: 'tvshows', component: TVShowsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
