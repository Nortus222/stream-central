import { Component } from '@angular/core';
import { MovieproxyService } from '../movieproxy.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  results: any = [];

  constructor(private route: ActivatedRoute, private movie$: MovieproxyService) {
      this.movie$.getMovies().subscribe((res: any) => {
        this.results = res;
        console.log(res);
      });
  }

}
