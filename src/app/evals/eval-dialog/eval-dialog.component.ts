import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudyEvalVM } from 'med-ai-common';
import { EvalService } from 'src/app/services/eval.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-eval-image-dialog',
  templateUrl: './eval-dialog.component.html',
  styleUrls: ['./eval-dialog.component.scss']
})
export class EvalDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EvalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudyEvalVM,
    public evalService: EvalService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  imgLoad() {
  }

  deleteEval() {
    this.evalService.deleteEval(this.data.id)
    .subscribe( r => {
      this.dialogRef.close()
      this.notificationService.showNotification('successfully deleted eval')
    })
  }

}
