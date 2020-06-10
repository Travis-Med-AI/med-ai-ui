import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';

@Component({
  selector: 'app-evals',
  templateUrl: './evals.component.html',
  styleUrls: ['./evals.component.scss']
})
export class EvalsComponent implements OnInit {
  evals$ = this.jobService.getEvals();

  displayedColumns = ['id', 'study', 'result', 'model', 'status', 'lastUpdate']

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
  }

}
