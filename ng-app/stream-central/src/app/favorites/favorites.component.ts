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
  
  favorites: any = [];
  user: any;

  constructor(private router: ActivatedRoute, private contentService: ContentproxyService, private _snackbar: MatSnackBar) {
    this.contentService.getFavorites().subscribe((res: any) => {
      console.log(res);
      this.favorites = res.movies;
      this.user = res.user;
    });
  }

  removeFromFavorites(contentId: number): void{
    this.contentService.removeFromFavorites(contentId).subscribe((res: any) => {
      console.log(res);
      if (res) {
        console.log(this.favorites);
        this.favorites = this.favorites.filter((item: any) => item.id !== contentId);
        console.log(this.favorites);
        this._snackbar.open('Removed from Favorites', 'Close', {
          duration: 200,
        });
      }
    });
  }
  
  
}
