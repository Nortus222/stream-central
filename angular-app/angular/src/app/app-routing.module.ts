import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { FavoriteslistComponent } from './favoriteslist/favoriteslist.component';
import { ContentDetailsComponent } from './content-details/content-details.component';

const routes: Routes = [
  { path: '',  component: HomepageComponent },
  { path: 'content/:id', component: ContentDetailsComponent },
  { path: 'favorites',  component: FavoriteslistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
