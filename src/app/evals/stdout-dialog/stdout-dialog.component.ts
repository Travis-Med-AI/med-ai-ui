import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EvalService } from 'src/app/services/eval.service';
import { takeUntil, switchMap } from 'rxjs/operators';
import { StudyEvalVM } from 'med-ai-common';
import { map } from 'lodash';

@Component({
  selector: 'app-stdout-dialog',
  templateUrl: './stdout-dialog.component.html',
  styleUrls: ['./stdout-dialog.component.scss']
})
export class StdoutDialogComponent implements OnInit {
  logs = []

  constructor(public dialogRef: MatDialogRef<StdoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudyEvalVM,
    private evalService: EvalService) {
      this.evalService.getLog(this.data.id).pipe(
        switchMap(l => {
          this.logs = l;
          return this.evalService.getLogSocket(this.data.id)
        }),
        takeUntil(this.dialogRef.afterClosed())
      ).subscribe(l => this.logs.push(l))
      // this.registerToLog();
    }

  ngOnInit(): void {
  }

  // registerToLog() {
  //   this.evalService.getLogSocket(this.data.id).pipe(takeUntil(this.dialogRef.afterClosed())).subscribe(l => {
  //     this.data.logs.push(l.line);
  //   })
  // }
}
