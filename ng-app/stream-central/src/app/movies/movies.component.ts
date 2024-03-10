import { Component } from '@angular/core';
import { ContentproxyService } from '../contentproxy.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  results: any = [];

  constructor(private route: ActivatedRoute, private content$: ContentproxyService) {
    this.content$.getMovies().subscribe((res: any) => {
      this.results = res;
      console.log(res);
    });
  }
}
