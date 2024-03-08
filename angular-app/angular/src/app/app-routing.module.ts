import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { FavoriteslistComponent } from './favoriteslist/favoriteslist.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '',  component: HomepageComponent },
  { path: 'content/:id', component: ContentDetailsComponent },
  { path: 'content/:id/', redirectTo: ''},
  { path: 'favorites',  component: FavoriteslistComponent },
  { path: 'favorites/content/:id', redirectTo: 'content/:id' },
  { path: 'login',  component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
