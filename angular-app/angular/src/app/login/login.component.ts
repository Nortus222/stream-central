import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showSignUpForm = false;
  username = '';
  password = '';
  email = '';

  constructor(private authService: AuthService) { }

  loginSubmit() {
    this.authService.login(this.username, this.password);
  }

  signupSubmit() {
    this.authService.signup(this.username, this.password, this.email);
  }
}

