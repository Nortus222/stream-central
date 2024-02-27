import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieproxyService {

  hostUrl:string = 'http://localhost:4200'

  constructor(private httpClient: HttpClient) { }
}
