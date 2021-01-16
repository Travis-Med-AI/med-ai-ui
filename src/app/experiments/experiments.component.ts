import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StudyViewModel } from 'med-ai-common';
import { ExperimentService } from '../services/experiment.service';
import { StudyService } from '../services/study.service';
import { concat, includes, remove } from 'lodash';
import { CdkDragDrop, DropListRef } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { NewExperimentComponent } from '../new-experiment/new-experiment.component';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExperimentsComponent implements OnInit {
  experiments = [];
  experiementIds = [];
  selectedStudies = [];

  constructor(private experimentService: ExperimentService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getExperiments();
  }

  getExperiments() {
    this.experimentService.getExperiments().subscribe(es => {
      this.experiments = es;
    })
  }

  updateSelectedStudies(selected) {
    this.selectedStudies = selected;
  }

  createNewExperiment() {
    const dialogRef = this.dialog.open(NewExperimentComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(_ => this.getExperiments())
  }
}
