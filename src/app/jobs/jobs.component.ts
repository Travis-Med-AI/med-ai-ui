import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs$ = this.jobService.getJobs();
  displayedColumns = ['id', 'name', 'status', 'endDate', 'lastRun', 'killJob']

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
  }

  killJob(id:number) {
    this.jobService.killJob(id).subscribe(j => {
      alert('successfuly killed job')
      this.jobs$ = this.jobService.getJobs();
    })
  }

}
