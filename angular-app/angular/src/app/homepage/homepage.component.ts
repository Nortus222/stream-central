import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieproxyService } from '../movieproxy.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

    allMovies: any = [];

    constructor(private route: ActivatedRoute, private movie$: MovieproxyService) {
        this.movie$.getMovies().subscribe((res: any) => {
          this.allMovies = res;
          console.log(res);
      });
    }

    ngOnInit(): void {}
}
