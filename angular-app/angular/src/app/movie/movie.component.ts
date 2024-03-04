import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieproxyService } from '../movieproxy.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  
    title: string = "";
    movieId: string = "969492";
    description: string = "";
  
    constructor(private route: ActivatedRoute, private movie$: MovieproxyService) {
      // this.movieId = this.route.snapshot.params['movieId'];
        this.movie$.getMovieById(this.movieId).subscribe((res: any) => {
          this.title = res.title;
          this.description = res.description;
      });
    }

    ngOnInit(): void {}
}
