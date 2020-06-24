import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs$ = this.jobService.getJobs();
  displayedColumns = ['name', 'lastRun', 'jobToggle']

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
  }

  toggleJob(id:number, running:boolean) {
    if (running) {
      this.jobService.killJob(id).subscribe(j => {
        this.jobs$ = this.jobService.getJobs();

      })
    } else {
      this.jobService.startJob(id).subscribe(j => {
        this.jobs$ = this.jobService.getJobs();
      })
    }

  }

}
