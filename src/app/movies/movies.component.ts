import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MovieSearchService } from '../shared/movie-search.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  foundMoviesNowPlaying: any[];
  foundMoviesUpcoming: any[];
  foundMoviesMostPopular: any[];
  foundMoviesSearch: any[];

  foundMoviesNowPlayingImages: any[];
  foundMoviesUpcomingImages: any[];
  foundMoviesMostPopularImages: any[];
  foundMoviesSearchImages: any[];

  searchMovieForm: FormGroup;

  searching = false;
  imageNotAvailable = false;

  constructor(private movieSearchService: MovieSearchService) { }

  selected = 'now playing';

  ngOnInit() {

    this.foundMoviesNowPlayingImages = [];
    this.foundMoviesUpcomingImages = [];
    this.foundMoviesMostPopularImages = [];
    this.foundMoviesSearchImages = [];

    this.searchMoviesNowPlaying();

    this.searchMovieForm = new FormGroup({
      'searchQuery': new FormControl('')
    });
  }

  searchMoviesNowPlaying() {
    this.searching = true;
    this.foundMoviesUpcoming = [];
    this.foundMoviesMostPopular = [];
    this.foundMoviesSearch = [];
    return this.movieSearchService.getMoviesNowPlaying().subscribe(
      data => this.handleMoviesNowPlaying(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  searchMoviesUpcoming() {
    this.searching = true;
    this.foundMoviesNowPlaying = [];
    this.foundMoviesMostPopular = [];
    this.foundMoviesSearch = [];
    return this.movieSearchService.getMoviesUpcoming().subscribe(
      data => this.handleMoviesUpcoming(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  searchMoviesMostPopular() {
    this.searching = true;
    this.foundMoviesUpcoming = [];
    this.foundMoviesNowPlaying = [];
    return this.movieSearchService.getMoviesMostPopular().subscribe(
      data => this.handleMoviesMostPopular(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  searchMovies() {
    this.searching = true;
    this.foundMoviesUpcoming = [];
    this.foundMoviesNowPlaying = [];
    this.foundMoviesMostPopular = [];
    const searchMovieQuery = this.searchMovieForm.value.searchQuery;
    return this.movieSearchService.getMovieSearch(searchMovieQuery).subscribe(
      data => this.handleMovieSearch(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  handleMoviesNowPlaying(data) {
    this.foundMoviesNowPlaying = data.results;

    for (let i = 0; i < this.foundMoviesNowPlaying.length; i++) {
      if (this.foundMoviesNowPlaying[i].poster_path !== null) {
        this.foundMoviesNowPlayingImages.push('https://image.tmdb.org/t/p/w185' + this.foundMoviesNowPlaying[i].poster_path);
      }
      else if (this.foundMoviesNowPlaying[i].backdrop_path !== null) {
        this.foundMoviesNowPlayingImages.push('https://image.tmdb.org/t/p/w300' + this.foundMoviesNowPlaying[i].backdrop_path);
      }
      else {
        this.foundMoviesNowPlayingImages.push('noImage');
      }
    }
    console.log(this.foundMoviesNowPlaying);
  }

  handleMoviesUpcoming(data) {
    this.foundMoviesUpcoming = data.results;

    for (let i = 0; i < this.foundMoviesUpcoming.length; i++) {
      if (this.foundMoviesUpcoming[i].poster_path != null) {
        this.foundMoviesUpcomingImages.push('https://image.tmdb.org/t/p/w185' + this.foundMoviesUpcoming[i].poster_path);
      }
      else if (this.foundMoviesUpcoming[i].backdrop_path != null) {
        this.foundMoviesUpcomingImages.push('https://image.tmdb.org/t/p/w300' + this.foundMoviesUpcoming[i].backdrop_path);
      }
      else {
        this.foundMoviesUpcomingImages.push('noImage');
      }
    }

    // console.log(this.foundMoviesUpcomingImages);
    console.log(this.foundMoviesUpcoming);
  }

  handleMoviesMostPopular(data) {
    this.foundMoviesMostPopular = data.results;

    for (let i = 0; i < this.foundMoviesMostPopular.length; i++) {
      if (this.foundMoviesMostPopular[i].poster_path != null) {
        this.foundMoviesMostPopularImages.push('https://image.tmdb.org/t/p/w185' + this.foundMoviesMostPopular[i].poster_path);
      }
      else if (this.foundMoviesMostPopular[i].backdrop_path != null) {
        this.foundMoviesMostPopularImages.push('https://image.tmdb.org/t/p/w300' + this.foundMoviesMostPopular[i].backdrop_path);
      }
      else {
        this.foundMoviesMostPopularImages.push('noImage');
      }
    }

    console.log(this.foundMoviesMostPopular);
  }

  handleMovieSearch(data) {
    this.foundMoviesSearch = data.results;

    for (let i = 0; i < this.foundMoviesSearch.length; i++) {
      if (this.foundMoviesSearch[i].poster_path != null) {
        this.foundMoviesSearchImages.push('https://image.tmdb.org/t/p/w185' + this.foundMoviesSearch[i].poster_path);
      }
      else if (this.foundMoviesSearch[i].backdrop_path != null) {
        this.foundMoviesMostPopularImages.push('https://image.tmdb.org/t/p/w300' + this.foundMoviesSearch[i].backdrop_path);
      }
      else {
        this.foundMoviesSearchImages.push('noImage');
      }
    }

    console.log(this.foundMoviesSearch);
  }

  handleError(error) {
    console.log(error);
  }
}
