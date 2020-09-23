import { Component, OnInit, Inject, HostBinding, Host } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { trigger, transition, animate, style, query, stagger, state } from '@angular/animations';

import { map, mergeMap } from 'rxjs/operators';

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
  foundMovieResultsData: any[];
  foundMovieDetailsResults: any[];
  foundMovieFullDetails: any[];

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
  ];

  ngOnInit() {

    this.foundMoviesNowPlayingImages = [];
    this.foundMoviesUpcomingImages = [];
    this.foundMoviesMostPopularImages = [];
    this.foundMoviesSearchImages = [];
    // this.foundMovieFullDetails = [];


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
      width: '475px',
      data: {
        movieData: openPoster,
        // movieDetailsInfo: this.foundMovieDetailsResults,
        movieDetailsInfo: this.foundMovieResultsData,
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
    this.foundMovieFullDetails = [];
    this.foundMovieResultsImages = [];
    return this.movieSearchService.getMoviesNowPlaying().subscribe(
      data => this.handleAllMovieResults(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  // searchMoviesNowPlaying() {
  //   this.searching = true;
  //   this.foundMovieResults = [];
  //   this.foundMovieResultsImages = [];
  //   return this.movieSearchService.getMoviesNowPlaying().pipe(
  //     map(movies => {
  //       const movie = movies.results[0];
  //       // console.log(movies.results[0]);
  //       console.log(movie);
  //       return movie;
  //     }),
  //     mergeMap(movie => this.movieSearchService.getMovieDetails(movie.id))
  //   ).subscribe(moviedata => {
  //     this.foundMovieFullDetails = moviedata;
  //     console.log(this.foundMovieFullDetails);
  //   });
  // }

  // searchMoviesNowPlaying() {
  //   this.searching = true;
  //   this.foundMovieResults = [];
  //   this.foundMovieResultsImages = [];
  //   this.movieSearchService.getMoviesNowPlaying().pipe(
  //     mergeMap((movie) => {
  //       return this.movieSearchService.getMovieDetails(movie.id)
  //     })
  //   ).subscribe(fullMovieData => console.log(fullMovieData));
  // }

  searchMoviesUpcoming() {
    this.searching = true;
    this.foundMovieResults = [];
    this.foundMovieResultsData = [];
    this.foundMovieFullDetails = [];
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
    this.foundMovieResultsData = [];
    this.foundMovieFullDetails = [];
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
    this.foundMovieResultsData = [];
    this.foundMovieFullDetails = [];
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
    // this.foundMovieResults = data.results;
    this.foundMovieResultsData = data.results;

    // this.movieSearchService.getMovieDetails().pipe(
    //   mergeMap((movie) => {
    //     return this.movieSearchService.getMovieDetails(movie.id)
    //   })
    // ).subscribe(fullMovieData => console.log(fullMovieData));

    for (let i = 0; i < this.foundMovieResultsData.length; i++) {

      this.movieSearchService.getMovieDetails(this.foundMovieResultsData[i].id).subscribe(
        fullDetailsData => this.foundMovieFullDetails.push(fullDetailsData));

      if (this.foundMovieResultsData[i].poster_path !== null) {
        this.foundMovieResultsImages.push('https://image.tmdb.org/t/p/w185' + this.foundMovieResultsData[i].poster_path);
      }
      else if (this.foundMovieResultsData[i].backdrop_path !== null) {
        this.foundMovieResultsImages.push('https://image.tmdb.org/t/p/w300' + this.foundMovieResultsData[i].backdrop_path);
      }
      else {
        this.foundMovieResultsImages.push('noImage');
      }
    }

    console.log(Object.keys(this.foundMovieFullDetails));
    console.log(this.foundMovieResultsData);
    console.log(this.foundMovieResultsImages);
    this.handleFinalDetails(this.foundMovieFullDetails);
  }

  handleFinalDetails(movieData) {
    // console.log(movieData);
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
