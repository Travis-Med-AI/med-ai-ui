import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { EvalService } from '../services/eval.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-evals',
  templateUrl: './evals.component.html',
  styleUrls: ['./evals.component.scss']
})
export class EvalsComponent implements OnInit {
  JSON = JSON
  totalEvals = 0;
  evals = []
  searchControl = new FormControl('');
  displayedColumns = []

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private evalService: EvalService,
              private notficiationService: NotificationService,
              private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.fetchEvals(0,10);
    this.searchControl.valueChanges.subscribe(s => this.fetchEvals(0,10))
    this.setupColumns();
  }

  setupColumns() {
    let mobileColumns = [
      'patient',
      'model',
      'result',
    ]
    let extraColumns = [
      'status',
      'lastUpdate',
      'download',
      'delete'
    ]
    if(this.deviceService.isMobile()) {
      this.displayedColumns = mobileColumns
    } else {
      this.displayedColumns = mobileColumns.concat(extraColumns)
    }
  }

  page(pageEvent: PageEvent) {
    this.fetchEvals(pageEvent.pageIndex, pageEvent.pageSize)
  }

  fetchEvals(pageIndex: number, pageSize:number) {
    this.evalService.getEvals(pageIndex, pageSize, this.searchControl.value).subscribe(res => {
      this.totalEvals = res.total;
      this.evals = res.payload;
    })
  }

  getImage(id) {
    this.evalService.getOutputImage(id);
  }

  deleteEval(evalId) {
    this.evalService.deleteEval(evalId)
    .subscribe( r => {
      this.fetchEvals(this.paginator.pageIndex, this.paginator.pageSize)
      this.notficiationService.showNotification('successfully deleted eval')
    })
  }

}
