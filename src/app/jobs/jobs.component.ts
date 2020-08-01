import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { NotificationService } from '../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { VirtualTimeScheduler, interval } from 'rxjs';
import { RegisterModelComponent } from '../register-model/register-model.component';
import { ModelService } from '../services/model.service';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs = []
  jobs$ = interval(5000).pipe(
    startWith(0),
    switchMap(() => this.jobService.getJobs())
  )
  jobSubscription = this.jobs$.subscribe(jobs => this.jobs = jobs);
  displayedColumns = ['name', 'lastRun', 'jobToggle']

  constructor(private jobService:JobService,
              private modelSerivce: ModelService,
              private notificationService: NotificationService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
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
    this.jobSubscription.unsubscribe()
    this.jobSubscription = this.jobs$.subscribe(jobs => this.jobs = jobs);
  }

  retry(image: string) {
    this.modelSerivce.retryModel(image).subscribe(i => {
      this.jobs$ = this.jobService.getJobs();
      this.notificationService.showNotification('Successfully downloaded')
    })
  }

  setAsClassifier(model: any) {
    this.modelSerivce.setClassifier(model.image, model.modality).subscribe(res => {
      this.notificationService.showNotification(`Set ${model.displayName} as classifer for ${model.modality}`)
    })
  }

}
