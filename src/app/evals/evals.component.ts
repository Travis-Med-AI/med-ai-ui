import { Component, OnInit, ViewChild } from '@angular/core';
import { JobService } from '../job.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-evals',
  templateUrl: './evals.component.html',
  styleUrls: ['./evals.component.scss']
})
export class EvalsComponent implements OnInit {
  totalEvals = 0;
  evals = []

  displayedColumns = ['id', 'study', 'result', 'model', 'status', 'lastUpdate']
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.fetchEvals(0,5);
  }

  page(pageEvent: PageEvent) {
    this.fetchEvals(pageEvent.pageIndex, pageEvent.pageSize)
  }

  fetchEvals(pageIndex: number, pageSize:number) {
    this.jobService.getEvals(pageIndex, pageSize).subscribe(res => {
      this.totalEvals = res.total;
      this.evals = res.evals;
    })
  }

}