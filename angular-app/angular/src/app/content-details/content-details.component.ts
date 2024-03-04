import { Component, inject } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MovieproxyService } from '../movieproxy.service';
import { Content } from '../content';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrl: './content-details.component.css'
})
export class ContentDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  contentService: MovieproxyService = inject(MovieproxyService);
  content: any | undefined;

  constructor() {
    const contentId = this.route.snapshot.params['id'];
    console.log('Content ID from route:', contentId);
    this.contentService.getMovieById(contentId).subscribe((res: any) => {
      this.content = res;
      console.log(res);
    });
  }
}
