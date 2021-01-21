import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { concat } from 'lodash';
import { ExperimentStatus, ExperimentViewModel, StudyViewModel } from 'med-ai-common';
import { ExperimentService } from '../services/experiment.service';
import { ModelService } from '../services/model.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-experiment-card',
  templateUrl: './experiment-card.component.html',
  styleUrls: ['./experiment-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExperimentCardComponent implements OnInit {
  @Input() experiment: ExperimentViewModel
  @Input() selectedStudies: number[]
  @Output() deleted: EventEmitter<boolean> = new EventEmitter()

  statuses = ExperimentStatus
  models$ = this.modelService.getModels();
  studies: StudyViewModel[];
  modelControl = new FormControl();
  expanded = false;
  constructor(private experimentService: ExperimentService,
              private modelService: ModelService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.experimentService.getStudiesByExperiment(this.experiment.id).subscribe(s => {
      this.studies = s.payload
    })
  }

  expand() {
    if (!this.expanded) {
      this.expanded = true;
      this.experimentService.getStudiesByExperiment(this.experiment.id).subscribe(s => {
        this.studies = s.payload
      })
    } else {
      this.expanded = false;
    }
  }

  drop(item: CdkDragDrop<StudyViewModel[], StudyViewModel>) {
    let ids = concat(this.selectedStudies, [item.item.data.id])
    if (this.experiment.type != item.item.data.type) {
      this.notificationService.showNotification(`Experiment can only take type:${this.experiment.type}`)
      return
    }
    this.experimentService.addStudiesToExperiment(ids, this.experiment.id).subscribe(s => this.studies = s.payload)
  }

  entered () {
    console.log('entered ', this.experiment.id)
  }

  startExperiment() {
    this.experimentService.startExperiment(this.experiment.id, this.modelControl.value).subscribe(e => this.experiment = e);
  }

  stopExperiment() {
    this.experimentService.stopExperiment(this.experiment.id).subscribe(e => this.experiment = e);
  }

  deleteExperiment() {
    this.experimentService.deleteExperiment(this.experiment.id).subscribe(e => this.deleted.emit(true))
  }

  downloadResults() {
    this.experimentService.getResults(this.experiment.id);
  }
}
