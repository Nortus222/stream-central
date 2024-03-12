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
  { path: 'favorites/content/:id', redirectTo: ':type/content/:id' },
  { path: ':type/content/:id', component: ContentDetailsComponent },
  { path: 'movies', component: MoviesComponent},
  { path: 'movies/content/:id', redirectTo: ':type/content/:id' },
  { path: 'tvshows', component: TvshowsComponent},
  { path: 'tvshows/content/:id', redirectTo: ':type/content/:id' },
  { path: 'auth/google', redirectTo: 'https://streamcentral.azurewebsites.net/auth/google'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
