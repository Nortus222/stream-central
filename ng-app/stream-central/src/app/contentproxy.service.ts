import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentproxyService {
  hostUrl:string = 'https://streamcentral.azurewebsites.net';

  constructor(private httpClient: HttpClient) { }

  getMovieById(movieId: string) {
    return this.httpClient.get( this.hostUrl + '/movies/' + movieId);
  }

  getMovies() {
    return this.httpClient.get( this.hostUrl + '/movies');
  }

  getFavorites() {
    return this.httpClient.get( this.hostUrl + '/user/favorites');
  }

  getTVShows() {
    return this.httpClient.get( this.hostUrl + '/tvshows');
  }

  getTVShowById(tvshowId: string) {
    return this.httpClient.get( this.hostUrl + '/tvshows/' + tvshowId);
  }

  addToFavorites(contentId: number) {
    return this.httpClient.post( this.hostUrl + '/user/favorites/' + contentId, {});
  }

  removeFromFavorites( contentId: number) {
    return this.httpClient.delete( this.hostUrl + '/user/favorites/' + contentId, {});
  }

  getContentById(contentId: string, contentType: string) {
    if (contentType === 'movies') {
      return this.getMovieById(contentId);
    } else {
      return this.getTVShowById(contentId);
    }
  }

  getAllContent() {
    return this.httpClient.get<any[]>( this.hostUrl + '/allContent');
  }
}
