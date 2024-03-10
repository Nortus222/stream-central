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
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContentDetailsComponent,
    FavoritesComponent,
    LoginComponent
  ],
  imports: [
    PaginationModule.forRoot(),
    FormsModule, 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ContentproxyService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
