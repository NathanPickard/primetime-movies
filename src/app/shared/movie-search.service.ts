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
    // return this.httpClient.get<any>(this.TMDB_API_URL + '')
    return this.httpClient.get<any>('https://api.themoviedb.org/3/movie/now_playing?api_key=128ab7bff8b38ed01943900bbb4369bd&language=en-US&page=1');
  }

  getMoviesNowPlaying() {
    return this.httpClient.get<any>('https://api.themoviedb.org/3/movie/now_playing?api_key=128ab7bff8b38ed01943900bbb4369bd&language=en-US&page=1');
  }

}
