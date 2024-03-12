import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stream-central';

  constructor(public router: Router) { }

  get isLoggedIn() {
    return false;
    // return this.authService.isLoggedIn;
  }

}
