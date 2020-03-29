import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-poster',
  // template: `<img src="{{ passedData.foundMoviesNowPlayingImages }}">`
})
export class MoviePosterComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }
}
