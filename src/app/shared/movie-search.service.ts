import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {

  private TMDB_API_KEY: string = environment.TMDB_API_KEY;
  private TMDB_API_URL: string = environment.TMDB_API_URL;

  constructor(private httpClient: HttpClient) { }

  getDiscoverMovies() {
    return this.httpClient.get<any>(this.TMDB_API_URL + '')
  }

}
