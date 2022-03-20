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
import { FormControl } from '@angular/forms';

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

  getJobs() {
    this.jobService.getJobs().subscribe(j => this.jobs = j)
  }


}
