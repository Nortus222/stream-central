import { Component } from '@angular/core';
import { MovieproxyService } from '../movieproxy.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoriteslist',
  templateUrl: './favoriteslist.component.html',
  styleUrl: './favoriteslist.component.css'
})
export class FavoriteslistComponent {

  displayedColumns: string[] = ['title', 'year', 'rating', 'genre', 'director', 'actors', 'plot', 'poster', 'remove'];
  dataSource = new MatTableDataSource<any>();

  constructor(private router: Router, proxy$: MovieproxyService) {
    proxy$.getFavorites("2").subscribe((res: any) => {
      console.log(res);
      this.dataSource.data = res;
    }); 
  }
}
