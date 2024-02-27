import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { get } from 'http';

@Injectable({
  providedIn: 'root'
})
export class MovieproxyService {

  hostUrl:string = 'http://localhost:4200'

  constructor(private httpClient: HttpClient) { }

  getFavorites(index: string) {
    return this.httpClient.get( this.hostUrl + 'json/favorites' + index + '.json');
  }
}
