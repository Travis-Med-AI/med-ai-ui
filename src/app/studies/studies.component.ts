import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormArray, FormBuilder, FormControl } from '@angular/forms'
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { ModelService } from '../services/model.service';
import { StudyService } from '../services/study.service';
import { EvalService } from '../services/eval.service';
import { NotificationService } from '../services/notification.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Notifications } from 'med-ai-common';
import { MatDialog } from '@angular/material/dialog';
import { LabelDialogComponent } from '../label-dialog/label-dialog.component';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss'],
})
export class NewJobComponent implements OnInit {
  studies = []
  modelControls: {[id: string]: FormControl} = {}
  models$ = this.modelService.getModels();
  displayedColumns = []
  totalStudies = 0;
  searchControl = new FormControl('');
  orthancStudyCount$ = this.studyService.countOrthancStudies();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  pageIndex = 0;
  pageSize = 10;

  constructor(private modelService: ModelService,
              private studyService: StudyService,
              private evalService: EvalService,
              private notificationService: NotificationService,
              private deviceService: DeviceDetectorService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchStudies(this.pageIndex, this.pageSize);
    this.searchControl.valueChanges.subscribe(s => {
      if(this.paginator) {
        this.paginator.pageIndex = 0;
      }
      this.fetchStudies(this.pageIndex, this.pageSize);
    });
    this.setupColumns();
    this.notificationService.watchNotificationTypes([Notifications.studyReady])
      .subscribe(n => this.fetchStudies(this.pageIndex, this.pageSize))
  }

  setupColumns() {
    let mobileColumns = [
      'seriesUid',
      'model'
      ]
    let extraColumns = [
      'modality',
      'studyType'
    ]
    let actionColumn = ['submit', 'delete']
    if(this.deviceService.isMobile()) {
      this.displayedColumns = mobileColumns.concat(actionColumn)
    } else {
      this.displayedColumns = mobileColumns.concat(extraColumns, actionColumn)
    }
  }

  startEval(study) {
    let model = this.modelControls[study.orthancStudyId].value;
    this.evalService.evalDicom(model, study.id)
      .subscribe(res => this.notificationService.showNotification(`Sent request for evaluation of study ${study.id}`));
  }

  page(pageEvent: PageEvent) {
    this.fetchStudies(pageEvent.pageIndex, pageEvent.pageSize)
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
  }

  fetchStudies(pageIndex: number, pageSize: number) {
    this.studyService.getStudies(pageIndex, pageSize, this.searchControl.value).subscribe(studies => {
      studies.payload.forEach(s => {
        this.modelControls[s.orthancStudyId] = new FormControl('');
      })
      this.totalStudies = studies.total;
      this.studies = studies.payload;
    })
  }



  deleteStudy(study) {
    this.studyService.deleteStudy(study.id)
    .subscribe(res => this.notificationService.showNotification(`deleted study ${study.id}`));

  }

  openAddLabels() {
    const dialogRef = this.dialog.open(LabelDialogComponent, {
    });
  }

}
