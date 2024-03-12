import { Component, inject } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ContentproxyService } from '../contentproxy.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.component.html',
  styleUrl: './content-details.component.css'
})
export class ContentDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  contentService: ContentproxyService = inject(ContentproxyService);
  content: any | undefined;

  constructor(private _snackbar: MatSnackBar) {
    const contentId = this.route.snapshot.params['id'];
    const contentType = this.route.snapshot.params['type'];
    console.log('Content ID from route:', contentId);
    console.log('Content Type from route:', contentType);
    this.contentService.getContentById(contentId, contentType).subscribe((res: any) => {
      this.content = res;
      console.log(res);
    });
  }

  addToFavorites(contentId: number): void{
    this.contentService.addToFavorites(contentId).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this._snackbar.open('Added to Favorites', 'Close', {
          duration: 2000,
        });
      }
    });
  }
}
