import { Component } from '@angular/core';
import { Content } from '../contents';
import { ActivatedRoute} from '@angular/router';
import { ContentproxyService } from '../contentproxy.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  page = 1;
  pageSize = 15;
  pagedItems: any = [];
  contents: any = [];
  filteredContents: any = [];

  constructor(private route: ActivatedRoute, private content$: ContentproxyService) {
    this.content$.getAllContent().subscribe((res: any) => {
      this.contents = res;
      this.filteredContents = res;
      this.setPage(this.page)
      console.log(res);
  });
}
  addToFavorites(contentId: number): void{
    this.content$.addToFavorites(contentId).subscribe((res: any) => {
      console.log(res);
    });
  }

  setPage(pageNo: number): void {
    this.page = pageNo;
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedItems = this.filteredContents.slice(start, end);
  }

  filterResults(searchTerm: string) {
    if (!searchTerm) this.filteredContents = this.contents;

    this.filteredContents = this.contents.filter((contents: any) => {
      return contents.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    this.page = 1;
    this.setPage(this.page);
  }
  
  filterByType(contentType: string) {
    if (!contentType) 
      this.filteredContents = this.contents;
    else {
      this.filteredContents = this.contents.filter((content: any) => {
        return content.type.toLowerCase().includes(contentType.toLowerCase());
      });
    }
    this.page = 1;
    this.setPage(this.page);  
  }

  filterByGenre(genre: string) {
    if (!genre) 
      this.filteredContents = this.contents;
    else {
      this.filteredContents = this.contents.filter((content: any) => {
        return content.genre.toLowerCase().includes(genre.toLowerCase());
      });
    }
    
    this.page = 1;
    this.setPage(this.page);
  }
}
