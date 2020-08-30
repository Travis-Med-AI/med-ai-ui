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
import { EvalImageDialogComponent } from './eval-image-dialog/eval-image-dialog.component';
import { debounce } from 'lodash';

@Component({
  selector: 'app-evals',
  templateUrl: './evals.component.html',
  styleUrls: ['./evals.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EvalsComponent implements OnInit {
  searchControl = new FormControl('');
  evals: StudyEvalVM[] = []
  totalVisible = 30;
  pageIndex = 0;
  pageSize = 10;
  evalIdChange = new Subject();
  visibleEval: number;
  masonryConfig: NgxMasonryOptions = {
    // gutter: 1,
    fitWidth: true,
    horizontalOrder:true
  }

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  constructor(public evalService: EvalService,
              private notficiationService: NotificationService,
              private deviceService: DeviceDetectorService,
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
      this.masonry.reloadItems();
      this.masonry.layout();
    })
  }

  getImage(id) {
    this.evalService.getOutputImage(id);
  }

  deleteEval(evalId: number) {
    this.evalService.deleteEval(evalId)
    .subscribe( r => {
      this.fetchEvals()
      this.notficiationService.showNotification('successfully deleted eval')
    })
  }

  onScrollUp() {

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
    this.masonry.layout();
  }

  imgLoad() {
    this.masonry.reloadItems();
    this.masonry.layout();
  }

  openImageDialog(evalId: number) {
    let src = this.evalService.getOutputImageUrl(evalId)
    const dialogRef = this.dialog.open(EvalImageDialogComponent, {
      data: src,
      height: '50vh'
    });
  }
}
