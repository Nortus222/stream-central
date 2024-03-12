import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ContentproxyService } from './contentproxy.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TvshowsComponent } from './tvshows/tvshows.component';
import { MoviesComponent } from './movies/movies.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContentDetailsComponent,
    FavoritesComponent,
    TvshowsComponent,
    MoviesComponent
  ],
  imports: [
    PaginationModule.forRoot(),
    FormsModule, 
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
  ],
  providers: [ContentproxyService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
