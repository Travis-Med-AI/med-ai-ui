import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eval-image-dialog',
  templateUrl: './eval-image-dialog.component.html',
  styleUrls: ['./eval-image-dialog.component.scss']
})
export class EvalImageDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EvalImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
