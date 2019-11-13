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

  constructor(private movieSearchService: MovieSearchService) { }

  selected = 'Now playing';

  ngOnInit() {

    this.foundMoviesNowPlayingImages = [];
    this.foundMoviesUpcomingImages = [];

    this.searchMoviesNowPlaying();
  }

  searchMoviesNowPlaying() {
    return this.movieSearchService.getMoviesNowPlaying().subscribe(
      data => this.handleMoviesNowPlaying(data),
      error => this.handleError(error)
    );
  }

  searchMoviesUpcoming() {
    return this.movieSearchService.getMoviesUpcoming().subscribe(
      data => this.handleMoviesUpcoming(data),
      error => this.handleError(error)
    )
  }

  handleMoviesNowPlaying(data) {
    this.foundMoviesNowPlaying = data.results;

    for (let i = 0; i < this.foundMoviesNowPlaying.length; i++) {
      this.foundMoviesNowPlayingImages.push('https://image.tmdb.org/t/p/w185' + this.foundMoviesNowPlaying[i].poster_path);
    }

    console.log(this.foundMoviesNowPlaying);
  }

  handleMoviesUpcoming(data) {
    this.foundMoviesUpcoming = data.results;

    for (let i = 0; i < this.foundMoviesUpcoming.length; i++) {
      this.foundMoviesUpcomingImages.push('https://image.tmdb.org/t/p/w185' + this.foundMoviesUpcoming[i].poster_path);
    }

    console.log(this.foundMoviesUpcoming);
  }

  handleError(error) {
    console.log(error);
  }
}
