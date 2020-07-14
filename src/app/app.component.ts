import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public dialog: MatDialog) { }

  openAboutDialog() {
    const dialogRef = this.dialog.open(AboutComponent, {
      width: '450px',
    });
  }
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent {

  constructor(
    public dialogRef: MatDialogRef<AboutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onDialogClose(): void {
    this.dialogRef.close();
  }
}
