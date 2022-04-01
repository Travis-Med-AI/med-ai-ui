import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { EvalService } from '../services/eval.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { NotificationService } from '../services/notification.service';
import { Notifications, StudyEvalVM } from 'med-ai-common';
import * as _ from 'lodash'
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { StudyService } from '../services/study.service';
import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry';
import { MatDialog } from '@angular/material/dialog';
import { StdoutDialogComponent } from './stdout-dialog/stdout-dialog.component';
import { EvalDialogComponent } from './eval-dialog/eval-dialog.component';
import { debounce } from 'lodash';
import { TableColumn } from '../table/table.component';



@Component({
  selector: 'app-evals',
  templateUrl: './evals.component.html',
  styleUrls: ['./evals.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EvalsComponent implements OnInit {
  searchControl = new FormControl('');
  evals: StudyEvalVM[] = []
  totalVisible = 50;
  pageIndex = 0;
  pageSize = 1000;
  evalIdChange = new Subject();
  visibleEval: number;

  columns:TableColumn<StudyEvalVM>[] = [
    {
      name: 'Study Id',
      selector: (e) => e.orthancId
    },
    {
      name: 'Status',
      selector: (e) => e.status
    },
    {
      name: 'Output',
      selector: (e) => e.modelOutput? e.modelOutput.display: 'TBD'
    },
    {
      name: 'Model',
      selector: (e) => e.model? e.model.displayName: 'TBD'
    }
  ]

  constructor(public evalService: EvalService,
              private notficiationService: NotificationService,
              public studyService: StudyService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchEvals()
    this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe(s => {
      this.fetchEvals();
    })
    this.notficiationService.watchNotificationTypes([Notifications.newResult, Notifications.evalFailed, Notifications.evalStarted])
      .subscribe(n => this.fetchEvals())
  }

  fetchEvals() {
    console.log(`requesting evals for page ${this.pageIndex} with size ${this.totalVisible}`)
    this.evalService.getEvals(this.pageIndex, this.totalVisible, this.searchControl.value).subscribe(res => {
      this.evals = res.payload
    })
  }

  getImage(id) {
    this.evalService.getOutputImage(id);
  }

  onClick (e: StudyEvalVM) { 
    let dialog = this.dialog.open(EvalDialogComponent, {
      maxWidth: '75vw',
      data: e,
      panelClass: 'custom-dialog-container'
    })
    dialog.afterClosed().subscribe(f => this.fetchEvals())
  }

  onScrollDown() {
    this.totalVisible+=this.pageSize;
    this.fetchEvals()
  }

  viewLogs(studyEval: StudyEvalVM) {
    const dialogRef = this.dialog.open(StdoutDialogComponent, {
      data: studyEval,
      height: '75vh'
    });
  }

  onClose() {
    this.evalIdChange.next(null)
  }

  setEvalVisible(id: number) {
    this.visibleEval = id;
  }

  imgLoad() {
  }
}
