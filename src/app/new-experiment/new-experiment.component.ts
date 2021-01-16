import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudyType } from 'med-ai-common';
import { ExperimentService } from '../services/experiment.service';

@Component({
  selector: 'app-new-experiment',
  templateUrl: './new-experiment.component.html',
  styleUrls: ['./new-experiment.component.scss']
})
export class NewExperimentComponent implements OnInit {
  nameControl = new FormControl();
  studyTypeControl = new FormControl();
  studyTypes = Object.keys(StudyType)


  constructor(private experimentService: ExperimentService,
              public dialogRef: MatDialogRef<NewExperimentComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  createExperiment() {
    this.experimentService.addNewExperiment(this.nameControl.value, this.studyTypeControl.value).subscribe(e => this.dialogRef.close())
  }

}
