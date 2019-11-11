import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatDatepicker,
  MatFormFieldModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDatepicker,
    MatFormFieldModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatDatepicker,
    MatFormFieldModule,
    MatToolbarModule
  ]
})

export class MaterialModule { }