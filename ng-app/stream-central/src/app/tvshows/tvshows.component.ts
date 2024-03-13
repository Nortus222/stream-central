import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentproxyService } from '../contentproxy.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrl: './tvshows.component.css'
})
export class TvshowsComponent {
  results: any = [];

  constructor(private route: ActivatedRoute, private content$: ContentproxyService) {
    this.content$.getTVShows().subscribe((res: any) => {
      this.results = res;
      console.log(res);
    });
    
  }

  addToFavorites(contentId: number): void{
    this.content$.addToFavorites(contentId).subscribe((res: any) => {
      console.log(res);
    });
  }
}
