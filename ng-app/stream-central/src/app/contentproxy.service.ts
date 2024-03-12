import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentproxyService {
  hostUrl:string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getMovieById(movieId: string) {
    return this.httpClient.get( this.hostUrl + '/movies/' + movieId);
  }

  getMovies() {
    return this.httpClient.get( this.hostUrl + '/movies');
  }

  getFavorites(userId: string) {
    return this.httpClient.get( this.hostUrl + 'user/favorites/' + userId);
  }

  getTVShows() {
    return this.httpClient.get( this.hostUrl + '/tvshows');
  }

  getTVShowById(tvshowId: string) {
    return this.httpClient.get( this.hostUrl + '/tvshows/' + tvshowId);
  }

  addToFavorites(userId: string, contentId: number) {
    return this.httpClient.post( this.hostUrl + 'user/favorites/' + userId + '/' + contentId, {});
  }

  removeFromFavorites(userId: string, contentId: number) {
    return this.httpClient.delete( this.hostUrl + 'user/favorites/' + userId + '/' + contentId, {});
  }

  getContentById(contentId: string) {
    return this.httpClient.get( this.hostUrl + '/movies/' + contentId);
  } //might fix this later

  getAllContent() {
    return this.httpClient.get<any[]>( this.hostUrl + '/movies');
  }
}
