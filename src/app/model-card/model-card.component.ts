import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { isNull, isNumber } from 'lodash';
import { EvalJobViewModel, ModelViewModel } from 'med-ai-common';
import { iif, mergeMap, of, startWith, switchMap } from 'rxjs';
import { DeleteConfirmationComponent } from '../models/delete-confirmation/delete-confirmation.component';
import { JobService } from '../services/job.service';
import { ModelService } from '../services/model.service';
import { NotificationService } from '../services/notification.service';
import { StudyService } from '../services/study.service';

@Component({
  selector: 'app-model-card',
  templateUrl: './model-card.component.html',
  styleUrls: ['./model-card.component.scss']
})
export class ModelCardComponent implements OnInit {
  @Input() job: EvalJobViewModel;
  @Output() onUpdate = new EventEmitter();
  replicasControl = new FormControl(0)
  runningControl = new FormControl()
  cpuControl = new FormControl()
  modalityControl = new FormControl()
  deleteOrthancControl = new FormControl()
  replicas = 0
  running = false
  modalities$ = this.studyService.getModalities()
  constructor(private jobService: JobService,
              private notificationService: NotificationService,
              private dialog: MatDialog,
              private modelService: ModelService,
              private studyService: StudyService) { }

  ngOnInit(): void {
    this.setupReplicasControl()
    this.setupRunningToggle()
    this.setupCPUToggle()
    this.setupModalityControl()
    this.setupDeleteOrthancToggle()
  }

  setupRunningToggle () {
    this.runningControl.setValue(this.job.running)
    this.running = this.job.running
    this.runningControl.valueChanges.pipe(
      mergeMap(v => 
        iif(()=>v, this.jobService.startJob(this.job.id), this.jobService.killJob(this.job.id))  
      )
    ).subscribe(v => {
      this.running = !this.running
      this.notificationService.showNotification('Successfully toggled model')
    })
  }

  setupDeleteOrthancToggle() {
    this.deleteOrthancControl.setValue(this.job.deleteOrthanc)
    this.deleteOrthancControl.valueChanges.pipe(
      switchMap( v => this.jobService.toggleDeleteOrthanc(this.job.id))
    ).subscribe( v => {
      this.notificationService.showNotification(`Toggled delete orthanc`)
    })
  }

  setupReplicasControl () {
    this.replicas = this.job.replicas
    this.replicasControl.valueChanges.pipe(
      switchMap(v => {
        if (v != this.job.replicas && isNumber(v)) {
          return this.jobService.updateReplicas(this.job.id, v)
        } else {
          return of(null)
        }
      })
    ).subscribe(r => {
      if(r) {
        this.notificationService.showNotification('Successfully updated replicas')
      }
    })
  }

  setupCPUToggle() {
    this.cpuControl.setValue(this.job.cpu)
    this.cpuControl.valueChanges.pipe(
      switchMap( v => this.jobService.toggleCpu(this.job.id))
    ).subscribe( v => {
      this.notificationService.showNotification(`Toggled cpu`)
    })
  }

  setupModalityControl() {
    this.modalityControl.setValue(this.job.model.modality)
    this.modalityControl.valueChanges.pipe(
      switchMap( v => this.modelService.setModality(this.job.model.id, v))
    ).subscribe( r => {
      this.notificationService.showNotification(`Set modality`)
    })
  }

  updateReplicas(replicas: number){
    this.jobService.updateReplicas(this.job.id, replicas).subscribe(j => {
      this.notificationService.showNotification('Successfully updated replicas')
    })
  }

  delete() {
    this.modelService.deleteModel(this.job.model.id).subscribe(v => 
      this.notificationService.showNotification('Deleted Successfully'))
  }

}
