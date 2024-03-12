import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ContentproxyService } from '../contentproxy.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  result: any = [];
  favorites: any = [];

  constructor(private router: ActivatedRoute, private contentService: ContentproxyService, private _snackbar: MatSnackBar) {
    this.contentService.getFavorites().subscribe((res: any) => {
      this.result = res;
      console.log(res);
      this.favorites = this.result.movies;
    });
  }

  removeFromFavorites(contentId: number): void{
    this.favorites = this.favorites.filter((item: any) => item.id !== contentId);

    this.contentService.removeFromFavorites(contentId).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this._snackbar.open('Removed from Favorites', 'Close', {
          duration: 2000,
        });
      }
    });
  }
  
  
}
