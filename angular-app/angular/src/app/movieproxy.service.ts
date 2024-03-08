import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Content } from './content';

@Injectable({
  providedIn: 'root'
})
export class MovieproxyService {

  hostUrl:string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  addToFavorites(userId: string, movieId: number) {
    return this.httpClient.post( this.hostUrl + '/favorites/' + userId + '/' + movieId, {});
  }

  removeFromFavorites(userId: string, movieId: number) {
    return this.httpClient.delete( this.hostUrl + '/favorites/' + userId + '/' + movieId, {});
  }

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
}
