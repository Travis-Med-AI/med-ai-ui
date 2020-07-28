import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { NotificationService } from '../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { VirtualTimeScheduler } from 'rxjs';
import { RegisterModelComponent } from '../register-model/register-model.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs$ = this.jobService.getJobs();
  displayedColumns = ['name', 'lastRun', 'jobToggle']

  constructor(private jobService:JobService,
              private notificationService: NotificationService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addNew() {
    this.dialog.open(RegisterModelComponent)
    this.dialog.afterAllClosed.subscribe(_ => this.jobs$ = this.jobService.getJobs())
  }

  toggleJob(id:number, running:boolean) {
    if (running) {
      this.jobService.killJob(id).subscribe(j => {
        this.jobs$ = this.jobService.getJobs();
        this.notificationService.showNotification('Successfully turned job off')
      })
    } else {
      this.jobService.startJob(id).subscribe(j => {
        this.jobs$ = this.jobService.getJobs();
        this.notificationService.showNotification('Successfully turned job on')
      })
    }

  }

}
