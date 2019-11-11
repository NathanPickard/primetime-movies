import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ]
})

export class MaterialModule { }