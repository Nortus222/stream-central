import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ContentproxyService } from '../contentproxy.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  contentIds: any = [];
  favorites: any = [];

  constructor(private router: ActivatedRoute, private contentService: ContentproxyService) {
    this.contentService.getFavorites("2").subscribe((res: any) => {
      this.contentIds = res;
      console.log(res);
      this.getContentsByIds();
    });
  }

  removeFromFavorites(contentId: number): void{
    this.contentService.removeFromFavorites('2', contentId).subscribe((res: any) => {
      console.log(res);
    });
  }
  
  getContentsByIds() { 
    for (const movieId of this.contentIds.movies) 
      this.contentService.getContentById(movieId).subscribe((movie: any) => {
        console.log(movieId);
        this.favorites.push(movie);
        console.log(this.favorites);
    });
  }
}
