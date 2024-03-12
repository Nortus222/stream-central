import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { MoviesComponent } from './movies/movies.component';
import { TvshowsComponent } from './tvshows/tvshows.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'favorites/content/:id', redirectTo: 'content/:id' },
  { path: 'content/:id', component: ContentDetailsComponent },
  { path: 'movies', component: MoviesComponent},
  { path: 'movies/content/:id', redirectTo: 'content/:id' },
  { path: 'tvshows', component: TvshowsComponent},
  { path: 'tvshows/content/:id', redirectTo: 'content/:id' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
