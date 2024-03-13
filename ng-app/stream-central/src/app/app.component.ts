import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentproxyService } from './contentproxy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stream-central';
  isLoggedIn = false;

  constructor(public router: Router, public contentService: ContentproxyService) { 

    this.contentService.checkifLoggedIn().subscribe((res: any) => {
      console.log(res);
      if (res.loggedIn) {
        this.isLoggedIn = true;
      }
    });
  }

  

}
