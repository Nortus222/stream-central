import { Component } from '@angular/core';
import { MovieproxyService } from '../movieproxy.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favoriteslist',
  templateUrl: './favoriteslist.component.html',
  styleUrl: './favoriteslist.component.css'
})
export class FavoriteslistComponent {

  // listObservable: Observable<any>[];

  // constructor(proxy$: MovieproxyService) {
  //   this.listObservable = proxy$.getFavorites();
  // }

  // ngOnInit() {
  // }
}
