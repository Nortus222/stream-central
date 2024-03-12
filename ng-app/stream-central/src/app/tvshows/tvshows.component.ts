import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentproxyService } from '../contentproxy.service';

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
}
