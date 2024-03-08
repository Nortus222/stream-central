import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Content } from './content';

@Injectable({
  providedIn: 'root'
})
export class MovieproxyService {

  hostUrl:string = 'https://streamcentral.azurewebsites.net';

  constructor(private httpClient: HttpClient) { }

  getMovieById(movieId: string) {
    return this.httpClient.get( this.hostUrl + '/movies/' + movieId);
  }

  getMovies() {
    return this.httpClient.get<Content[]>( this.hostUrl + '/movies');
  }

  getMovieCount() {
    return this.httpClient.get( this.hostUrl + '/moviesCount');
  }

  getFavorites(userId: string) {
    return this.httpClient.get( this.hostUrl + '/favorites/' + userId);
  }

  getTVShows() {
    return this.httpClient.get( this.hostUrl + '/tvshows');
  }

  getTVShowById(tvshowId: string) {
    return this.httpClient.get( this.hostUrl + '/tvshows/' + tvshowId);
  }

  getAllContent() {
    return this.httpClient.get( this.hostUrl + '/allContent');
  }
  
}
