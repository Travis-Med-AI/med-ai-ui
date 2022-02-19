import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModelManifestItem, ModelViewModel,csvVerification } from 'med-ai-common';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { switchMap } from 'rxjs/operators';
import { ModelService } from '../services/model.service';
import { StudyService } from '../services/study.service';

@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.scss']
})
export class LabelDialogComponent implements OnInit {
  fileName: string = '';
  labels;
  header = true;
  idsInCSV = 0;
  idsInDB = 0;
  keyBreakdown: {key: string, count: number}[] = []
  selectedModel: ModelViewModel;
  modelFormControl = new FormControl();
  models$ = this.modelService.getModels();
  models: ModelViewModel[] = [];
  fileSize = 0;
  maxFileSize = 2000000;
  fileStats: csvVerification;
  csv: File;

  constructor(private ngxCsvParser: NgxCsvParser, private studyService: StudyService, private modelService: ModelService) { }

  ngOnInit(): void {
    this.models$.subscribe(m => this.models = m);
    this.modelFormControl.valueChanges.subscribe(fc => {
      this.selectedModel = this.models.find(m => m.id ==fc)
      console.log(this.selectedModel, fc)
    })
  }

  onFileSelected(event) {
    console.log(event)
    let csv = event.target.files[0]
    this.csv = csv;
    this.fileName = csv.name;
    this.fileSize = csv.size;
    if (this.fileSize > this.maxFileSize) {
      alert('file to large to preview')
      return
    }
    this.studyService.checkForSeriesUID(csv, this.selectedModel.id).subscribe(r =>
      this.fileStats = r)
    this.ngxCsvParser.parse(csv, { header: this.header, delimiter: ',' })
    .subscribe((r: string[]) => {
      this.labels = r;
    });
  }

  onSave() {
    this.studyService.saveLabels(this.csv, this.selectedModel.id).subscribe(r => console.log(r))
  }
}
