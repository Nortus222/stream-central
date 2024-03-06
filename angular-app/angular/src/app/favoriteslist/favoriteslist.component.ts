import { Component, inject } from '@angular/core';
import { MovieproxyService } from '../movieproxy.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favoriteslist',
  templateUrl: './favoriteslist.component.html',
  styleUrls: ['./favoriteslist.component.css']
})
export class FavoriteslistComponent {
  contentIds: any = [];
  favorites: any = [];

  constructor(private routess: ActivatedRoute, private contentService: MovieproxyService) {
    this.contentService.getFavorites("2").subscribe((res: any) => {
      this.contentIds = res;
      console.log(res);
      this.getMoviesByIds();
    });
  }

  getMoviesByIds() { 
    for (const movieId of this.contentIds.movies) 
      this.contentService.getMovieById(movieId).subscribe((movie: any) => {
        console.log(movieId);
        this.favorites.push(movie);
        console.log(this.favorites);
    });
  }
}
