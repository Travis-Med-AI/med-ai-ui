import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { NotificationService } from '../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { VirtualTimeScheduler, interval } from 'rxjs';
import { RegisterModelComponent } from '../register-model/register-model.component';
import { ModelService } from '../services/model.service';
import { startWith, switchMap } from 'rxjs/operators';
import { EvalJobViewModel, Notifications } from 'med-ai-common';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  jobs: EvalJobViewModel[] = []
  jobs$ = this.getJobs()
  displayedColumns = ['name', 'lastRun', 'jobToggle']

  constructor(private jobService:JobService,
              private modelSerivce: ModelService,
              private notificationService: NotificationService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.notificationService.watchNotificationTypes([Notifications.modelReady]).subscribe(
      n => this.getJobs()
    )
  }

  addNew() {
    this.dialog.open(RegisterModelComponent)
    this.dialog.afterAllClosed.subscribe(_ => this.getJobs())
  }

  toggleJob(id:number, running:boolean) {
    if (running) {
      this.jobService.killJob(id).subscribe(j => {
        this.getJobs()
        this.notificationService.showNotification('Successfully turned job off')
      })
    } else {
      this.jobService.startJob(id).subscribe(j => {
        this.getJobs()
        this.notificationService.showNotification('Successfully turned job on')
      })
    }
  }

  getJobs() {
    this.jobService.getJobs().subscribe(j => this.jobs = j)
  }

  retry(image: string) {
    this.modelSerivce.retryModel(image).subscribe(i => {
      this.jobService.getJobs();
      this.notificationService.showNotification('Successfully downloaded')
    })
  }

  setAsClassifier(model: any) {
    this.modelSerivce.setClassifier(model.image, model.modality).subscribe(res => {
      this.notificationService.showNotification(`Set ${model.displayName} as classifer for ${model.modality}`)
    })
  }

  deleteJob(job:EvalJobViewModel) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {job}
    });
    dialogRef.afterClosed().subscribe(result => this.jobService.getJobs())
  }

  toggleQuickstart(model: any) {
    this.modelSerivce.toggleQuickstart(model.id).subscribe(j => {
      this.getJobs()
      this.notificationService.showNotification('Successfully toggle job')
    })
  }

}
