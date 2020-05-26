import { Component, OnInit, Inject, HostBinding, Host } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { trigger, transition, animate, style, query, stagger, state } from '@angular/animations';

// import { MoviePosterComponent } from './movie-poster.component';
import { MovieSearchService } from '../shared/movie-search.service';
import { listAnimation } from '../animations';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  animations: [listAnimation]
})
export class MoviesComponent implements OnInit {

  foundMovieResults: any[];
  foundMovieDetailsResults: any[];

  foundMoviesNowPlaying: any[];
  foundMoviesUpcoming: any[];
  foundMoviesMostPopular: any[];
  foundMoviesSearch: any[];

  foundMovieResultsImages: any[];

  foundMoviesNowPlayingImages: any[];
  foundMoviesUpcomingImages: any[];
  foundMoviesMostPopularImages: any[];
  foundMoviesSearchImages: any[];

  searchMovieForm: FormGroup;
  movieReleaseTypeControl = new FormControl('');

  searching = false;
  imageNotAvailable = false;
  foundSearchResults = false;

  constructor(private movieSearchService: MovieSearchService,
    public dialog: MatDialog) { }

  selected = 'Now Playing';

  movieReleaseType = [
    { value: 'Now Playing', viewValue: 'Now Playing' },
    { value: 'Coming Soon', viewValue: 'Coming Soon' },
    { value: 'Most Popular', viewValue: 'Most Popular' }
  ]

  ngOnInit() {

    this.foundMoviesNowPlayingImages = [];
    this.foundMoviesUpcomingImages = [];
    this.foundMoviesMostPopularImages = [];
    this.foundMoviesSearchImages = [];

    this.foundMovieResultsImages = [];
    this.foundMovieDetailsResults = [];

    this.searchMoviesNowPlaying();

    this.searchMovieForm = new FormGroup({
      'searchQuery': new FormControl('')
    });
  }

  openPosterDialog(openPoster) {
    console.log(openPoster.id);
    this.searchMovieDetails(openPoster.id);

    console.log(this.foundMovieDetailsResults);
    console.log(this.foundMovieResults);

    const dialogRef = this.dialog.open(MoviePosterComponent, {
      width: '450px',
      data: {
        movieData: openPoster,
        movieDetailsInfo: this.foundMovieDetailsResults,
        posterImgSrc: 'https://image.tmdb.org/t/p/w300' + openPoster.poster_path
      }
    });
  }

  onMovieTypeChange(movieType) {
    let selectedMovieType = movieType.value;
    console.log(selectedMovieType);
  }

  searchMovieDetails(movieId) {
    this.foundMovieDetailsResults = [];
    return this.movieSearchService.getMovieDetails(movieId).subscribe(
      data => this.handleMovieDetailsResults(data),
      error => this.handleError(error)
    );
  }

  searchMoviesNowPlaying() {
    this.searching = true;
    this.foundMovieResults = [];
    this.foundMovieResultsImages = [];
    // this.foundMoviesSearch = [];
    return this.movieSearchService.getMoviesNowPlaying().subscribe(
      data => this.handleAllMovieResults(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  searchMoviesUpcoming() {
    this.searching = true;
    this.foundMovieResults = [];
    this.foundMovieResultsImages = [];
    // this.foundMoviesSearch = [];
    return this.movieSearchService.getMoviesUpcoming().subscribe(
      data => this.handleAllMovieResults(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  searchMoviesMostPopular() {
    this.searching = true;
    this.foundMovieResults = [];
    this.foundMovieResultsImages = [];
    return this.movieSearchService.getMoviesMostPopular().subscribe(
      data => this.handleAllMovieResults(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  searchMovies() {
    this.searching = true;
    this.foundMovieResults = [];
    this.foundMovieResultsImages = [];
    const searchMovieQuery = this.searchMovieForm.value.searchQuery;
    return this.movieSearchService.getMovieSearch(searchMovieQuery).subscribe(
      data => this.handleAllMovieResults(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  handleMovieDetailsResults(data) {
    this.foundMovieDetailsResults = data;
    console.log(this.foundMovieDetailsResults);
  }


  handleAllMovieResults(data) {
    this.foundMovieResults = data.results;

    for (let i = 0; i < this.foundMovieResults.length; i++) {
      if (this.foundMovieResults[i].poster_path !== null) {
        this.foundMovieResultsImages.push('https://image.tmdb.org/t/p/w185' + this.foundMovieResults[i].poster_path);
      }
      else if (this.foundMovieResults[i].backdrop_path !== null) {
        this.foundMovieResultsImages.push('https://image.tmdb.org/t/p/w300' + this.foundMovieResults[i].backdrop_path);
      }
      else {
        this.foundMovieResultsImages.push('noImage');
      }
    }
    console.log(this.foundMovieResults);
  }

  handleMovieSearch(data) {
    this.foundMoviesSearch = data.results;
    this.foundSearchResults = true;

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

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html'
})
export class MoviePosterComponent {

  constructor(
    public dialogRef: MatDialogRef<MoviePosterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onDialogClose(): void {
    this.dialogRef.close();
  }
}
