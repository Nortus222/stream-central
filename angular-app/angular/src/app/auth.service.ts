import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  login(username: string, password: string) {
    if (username === 'user' && password === 'password') {
      this.isLoggedIn = true;
    }
  }

  signup(username: string, password: string, email: string) {
    // logic to create a new user
  }

  logout() {
    this.isLoggedIn = false;
  }
}
