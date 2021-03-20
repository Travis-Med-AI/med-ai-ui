import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EvalJobViewModel } from 'med-ai-common';
import { ModelService } from 'src/app/services/model.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {job: EvalJobViewModel},
    public modelSerivce: ModelService,
    public notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  confirm() {
    this.modelSerivce.deleteModel(this.data.job.model.id).subscribe(res => {
      this.notificationService.showNotification('Successfully deleted model');
      this.dialogRef.close();
    })
  }

  cancel() {
    this.dialogRef.close();
  }

}
