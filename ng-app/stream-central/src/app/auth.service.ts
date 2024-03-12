import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

const oAuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '321343580149-7msslemavpks4dpoa7cgt1ku34bi6gob.apps.googleusercontent.com',
  scope: 'openid profile email',
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(private readonly oAuthService: OAuthService) {
    oAuthService.configure(oAuthConfig);
    oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {

      oAuthService.tryLoginImplicitFlow().then(() => {
        if (oAuthService.hasValidIdToken()) {
          oAuthService.initLoginFlow();
        } else {
          oAuthService.loadUserProfile().then((userProfile) => {
            console.log('User profile', JSON.stringify(userProfile));
          });
        }
      });

    });

    // isAuthenticated(): Observable<any> {
    //   return this.http.get('/app/user/info');
    // }

   }

  
}
