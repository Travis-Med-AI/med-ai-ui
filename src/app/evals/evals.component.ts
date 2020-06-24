import { Component, OnInit, ViewChild } from '@angular/core';
import { JobService } from '../job.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-evals',
  templateUrl: './evals.component.html',
  styleUrls: ['./evals.component.scss']
})
export class EvalsComponent implements OnInit {
  totalEvals = 0;
  evals = []
  searchControl = new FormControl('');

  displayedColumns = ['id', 'study', 'patient', 'result', 'model', 'status', 'lastUpdate', 'download']
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.fetchEvals(0,5);
    this.searchControl.valueChanges.subscribe(s => this.fetchEvals(0,5))

  }

  page(pageEvent: PageEvent) {
    this.fetchEvals(pageEvent.pageIndex, pageEvent.pageSize)
  }

  fetchEvals(pageIndex: number, pageSize:number) {
    this.jobService.getEvals(pageIndex, pageSize, this.searchControl.value).subscribe(res => {
      this.totalEvals = res.total;
      this.evals = res.evals;
    })
  }

  getImage(id) {
    this.jobService.getOutputImage(id);
  }

}
