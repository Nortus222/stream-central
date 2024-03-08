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

  logout() {
    this.isLoggedIn = false;
  }
}
