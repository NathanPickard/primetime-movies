import { Component, OnInit } from '@angular/core';

import { MovieSearchService } from '../shared/movie-search.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  foundMoviesNowPlaying: any[];
  foundMoviesNowPlayingImages: any[];
  // foundImages: any[];

  constructor(private movieSearchService: MovieSearchService) { }

  ngOnInit() {
    this.foundMoviesNowPlayingImages = [];
    this.searchMoviesNowPlaying();
  }

  searchMoviesNowPlaying() {
    return this.movieSearchService.getMoviesNowPlaying().subscribe(
      data => this.handleMoviesNowPlaying(data),
      error => this.handleError(error)
    );
  }

  handleMoviesNowPlaying(data) {
    this.foundMoviesNowPlaying = data.results;

    for (let i = 0; i < this.foundMoviesNowPlaying.length; i++) {
      this.foundMoviesNowPlayingImages.push(this.foundMoviesNowPlaying[i].poster_path)
      // this.foundMoviesNowPlayingImages.push(this.foundMoviesNowPlaying);
      console.log('hello');
    }
    // this.foundImages = data.results;
    console.log(this.foundMoviesNowPlaying);
    console.log(this.foundMoviesNowPlayingImages);

    // this.foundMoviesNowPlayingImages.push('https://image.tmdb.org/t/p/w500' + )
  }

  handleError(error) {
    console.log(error);
  }

}
