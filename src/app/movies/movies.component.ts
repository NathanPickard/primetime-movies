import { Component, OnInit } from '@angular/core';

import { MovieSearchService } from '../shared/movie-search.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  foundMoviesNowPlaying: any[];
  foundMoviesUpcoming: any[];

  foundMoviesNowPlayingImages: any[];
  foundMoviesUpcomingImages: any[];

  searching = false;
  imageNotAvailable = false;

  constructor(private movieSearchService: MovieSearchService) { }

  // selected = 'Now playing';

  ngOnInit() {

    this.foundMoviesNowPlayingImages = [];
    this.foundMoviesUpcomingImages = [];

    this.searchMoviesNowPlaying();
  }

  searchMoviesNowPlaying() {
    this.searching = true;
    this.foundMoviesUpcoming = [];
    return this.movieSearchService.getMoviesNowPlaying().subscribe(
      data => this.handleMoviesNowPlaying(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  searchMoviesUpcoming() {
    this.searching = true;
    this.foundMoviesNowPlaying = [];
    return this.movieSearchService.getMoviesUpcoming().subscribe(
      data => this.handleMoviesUpcoming(data),
      error => this.handleError(error),
      () => this.searching = false
    )
  }

  handleMoviesNowPlaying(data) {
    this.foundMoviesNowPlaying = data.results;

    for (let i = 0; i < this.foundMoviesNowPlaying.length; i++) {
      if (this.foundMoviesNowPlaying[i].poster_path !== null) {
        this.foundMoviesNowPlayingImages.push('https://image.tmdb.org/t/p/w185' + this.foundMoviesNowPlaying[i].poster_path);
      }
      else if (this.foundMoviesNowPlaying[i].backdrop_path !== null ){
        this.foundMoviesNowPlayingImages.push('https://image.tmdb.org/t/p/w300' + this.foundMoviesNowPlaying[i].backdrop_path);
      }
      else {
        // this.imageNotAvailable = true;
      }
    }
    console.log(this.foundMoviesNowPlaying);
  }

  handleMoviesUpcoming(data) {
    this.foundMoviesUpcoming = data.results;

    for (let i = 0; i < this.foundMoviesUpcoming.length; i++) {
      if (this.foundMoviesUpcoming[i].poster_path !== null) {
        this.foundMoviesUpcomingImages.push('https://image.tmdb.org/t/p/w185' + this.foundMoviesUpcoming[i].poster_path);
      }
      else if (this.foundMoviesUpcoming[i].backdrop_path !== null) {
        this.foundMoviesUpcomingImages.push('https://image.tmdb.org/t/p/w300' + this.foundMoviesUpcoming[i].backdrop_path);
      }
      else {
        // this.imageNotAvailable = true;
      }
    }

    console.log(this.foundMoviesUpcoming);
  }

  handleError(error) {
    console.log(error);
  }
}
