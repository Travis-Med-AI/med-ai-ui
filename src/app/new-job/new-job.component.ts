import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormArray, FormBuilder, FormControl } from '@angular/forms'
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { ModelService } from '../services/model.service';
import { StudyService } from '../services/study.service';
import { EvalService } from '../services/eval.service';
import { NotificationService } from '../services/notification.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(private modelService: ModelService,
              private studyService: StudyService,
              private evalService: EvalService,
              private notificationService: NotificationService,
              private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.fetchStudies(0, 10);
    this.searchControl.valueChanges.subscribe(s => this.fetchStudies(0,10));
    this.setupColumns();
  }

  setupColumns() {
    let mobileColumns = [
      'patientId',
      'model'
      ]
    let extraColumns = [
      'modality',
      'studyType'
    ]
    let actionColumn = ['submit']
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

  filterModels(models, study) {
    return models.filter(m => m.input === study.type)
  }

}
