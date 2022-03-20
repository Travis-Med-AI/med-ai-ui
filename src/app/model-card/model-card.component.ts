import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { isNull, isNumber } from 'lodash';
import { EvalJobViewModel, ModelViewModel } from 'med-ai-common';
import { of, switchMap } from 'rxjs';
import { DeleteConfirmationComponent } from '../models/delete-confirmation/delete-confirmation.component';
import { JobService } from '../services/job.service';
import { ModelService } from '../services/model.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-model-card',
  templateUrl: './model-card.component.html',
  styleUrls: ['./model-card.component.scss']
})
export class ModelCardComponent implements OnInit {
  @Input() job: EvalJobViewModel;
  @Output() onUpdate = new EventEmitter();
  replicasControl = new FormControl(0)
  replicas = 0
  constructor(private jobService: JobService,
              private notificationService: NotificationService,
              private dialog: MatDialog,
              private modelService: ModelService) { }

  ngOnInit(): void {
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
        this.onUpdate.emit('updated')
        this.notificationService.showNotification('Successfully updated replicas')
      }
    })
  }

  toggleJob(id:number, running:boolean) {
    if (running) {
      this.jobService.killJob(id).subscribe(j => {
        this.notificationService.showNotification('Successfully turned job off')
      })
    } else {
      this.jobService.startJob(id).subscribe(j => {
        this.notificationService.showNotification('Successfully turned job on')
      })
    }
  }


  retry(image: string) {
    this.modelService.retryModel(image).subscribe(i => {
      this.onUpdate.emit('updated')
      this.notificationService.showNotification('Successfully downloaded')
    })
  }

  setAsClassifier(model: any) {
    this.modelService.setClassifier(model.image, model.modality).subscribe(res => {
      this.onUpdate.emit('updated')
      this.notificationService.showNotification(`Set ${model.displayName} as classifer for ${model.modality}`)
    })
  }

  deleteJob(job:EvalJobViewModel) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {job}
    });
    dialogRef.afterClosed().subscribe(result => this.onUpdate.emit('updated'))
  }


  updateReplicas(replicas: number){
    this.jobService.updateReplicas(this.job.id, replicas).subscribe(j => {
      this.onUpdate.emit('updated')
      this.notificationService.showNotification('Successfully updated replicas')
    })
  }

  toggleCpu(job: EvalJobViewModel) {
    this.jobService.toggleCpu(job.id).subscribe(res => {
      this.onUpdate.emit('updated')
      this.notificationService.showNotification(`Toggled cpu`)
    })
  }
}
