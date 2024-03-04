import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FavoriteslistComponent } from './favoriteslist/favoriteslist.component';
import { MovieComponent } from './movie/movie.component';

import { MovieproxyService } from './movieproxy.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ContentDetailsComponent } from './content-details/content-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FavoriteslistComponent,
    MovieComponent,
    ContentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [MovieproxyService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
