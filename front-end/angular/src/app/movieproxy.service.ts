import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieproxyService {

  hostUrl:string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getMovie(movieId: string) {
    return this.httpClient.get( this.hostUrl + '/movies' + movieId);
  }

  getMovies() {
    return this.httpClient.get<any[]>( this.hostUrl + '/movies/');
  }

  getMovieCount() {
    return this.httpClient.get( this.hostUrl + '/moviesCount');
  }

  getFavorites(userId: string) {
    return this.httpClient.get( this.hostUrl + '/favorites/' + userId);
  }
}
