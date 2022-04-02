import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudyEvalVM } from 'med-ai-common';
import { EvalService } from 'src/app/services/eval.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StudyService } from 'src/app/services/study.service';

@Component({
  selector: 'app-eval-image-dialog',
  templateUrl: './eval-dialog.component.html',
  styleUrls: ['./eval-dialog.component.scss']
})
export class EvalDialogComponent implements OnInit {
  orthancUrl=''

  constructor(public dialogRef: MatDialogRef<EvalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudyEvalVM,
    public evalService: EvalService,
    public studyService: StudyService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.orthancUrl = this.studyService.getOrthancUrl(this.data.orthancId)
  }

  imgLoad() {
  }

  openInOrthanc() {
    window.open(this.orthancUrl, "_blank")
  }

  deleteEval() {
    this.evalService.deleteEval(this.data.id)
    .subscribe( r => {
      this.dialogRef.close()
      this.notificationService.showNotification('successfully deleted eval')
    })
  }

}
