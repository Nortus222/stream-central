import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieproxyService } from '../movieproxy.service';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrl: './tvshows.component.css'
})
export class TVShowsComponent {
  results: any = [];

  constructor(private route: ActivatedRoute, private movie$: MovieproxyService) {
      this.movie$.getTVShows().subscribe((res: any) => {
        this.results = res;
        console.log(res);
      });
  }
}
