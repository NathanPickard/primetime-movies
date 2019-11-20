import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-movie-poster',
  // template: `<img src="{{ passedData.foundMoviesNowPlayingImages[i] }}">`
  template: ``
})
export class MoviePosterComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }
}