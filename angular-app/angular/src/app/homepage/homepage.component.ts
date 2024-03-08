import { Component, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MovieproxyService } from '../movieproxy.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
    contents: any = [];
    filteredContents: any = [];

    constructor(private route: ActivatedRoute, private movie$: MovieproxyService) {
        this.movie$.getAllContent().subscribe((res: any) => {
          this.contents = res;
          this.filteredContents = res;
          console.log(res);
      });
    }

    filterResults(searchTerm: string) {
      if (!searchTerm) this.filteredContents = this.contents;

      this.filteredContents = this.contents.filter((contents: any) => {
        return contents.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      // this.movie$.getMovies().subscribe((res: any) => {
      //     this.contents = res.filter((movie: any) => {
      //         return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      //     });
      // });
    }
    ngOnInit(): void {}
}
