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
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss'],
})
export class StudiesComponent implements OnInit {
  studies = []
  models$ = this.modelService.getModels();
  displayedColumns = []
  searchControl = new FormControl('');
  pageIndex = 0;
  totalVisible = 30;
  pageSize = 10;

  constructor(private modelService: ModelService,
              private studyService: StudyService,
              private notificationService: NotificationService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchStudies();
    this.searchControl.valueChanges.subscribe(s => {
      this.fetchStudies();
    });
    this.notificationService.watchNotificationTypes([Notifications.studyReady])
      .subscribe(n => this.fetchStudies())
  }

  fetchStudies() {
    this.studyService.getStudies(this.pageIndex, this.totalVisible, this.searchControl.value).subscribe(studies => {
      this.studies = studies.payload
    })
  }

  openAddLabels() {
    const dialogRef = this.dialog.open(LabelDialogComponent, {
    });
  }

}
