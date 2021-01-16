import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { concat } from 'lodash';
import { StudyViewModel } from 'med-ai-common';
import { ExperimentService, ExperimentStatus, ExperimentViewModel } from '../services/experiment.service';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-experiment-card',
  templateUrl: './experiment-card.component.html',
  styleUrls: ['./experiment-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExperimentCardComponent implements OnInit {
  @Input() experiment: ExperimentViewModel
  @Input() selectedStudies: number[]

  statuses = ExperimentStatus
  models$ = this.modelService.getModels();
  studies: StudyViewModel[];
  modelControl = new FormControl();
  expanded = false;
  constructor(private experimentService: ExperimentService, private modelService: ModelService) { }

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
    this.experimentService.addStudiesToExperiment(ids, this.experiment.id).subscribe(s => this.studies = s.payload)
  }

  entered () {
    console.log('entered ', this.experiment.id)
  }
}
