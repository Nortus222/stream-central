import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentproxyService {
  hostUrl:string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getFavorites(userId: string) {
    return this.httpClient.get( this.hostUrl + '/favorites/' + userId);
  }

  addToFavorites(userId: string, contentId: number) {
    return this.httpClient.post( this.hostUrl + '/favorites/' + userId + '/' + contentId, {});
  }

  removeFromFavorites(userId: string, contentId: number) {
    return this.httpClient.delete( this.hostUrl + '/favorites/' + userId + '/' + contentId, {});
  }

  getContentById(contentId: string) {
    return this.httpClient.get( this.hostUrl + '/movies/' + contentId);
  }

  getContents() {
    return this.httpClient.get<any[]>( this.hostUrl + '/movies');
  }
}
