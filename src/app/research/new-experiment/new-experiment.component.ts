import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-new-experiment',
  templateUrl: './new-experiment.component.html',
  styleUrls: ['./new-experiment.component.scss']
})
export class NewExperimentComponent implements OnInit {
  models$ = this.modelService.getModels();
  fileControl = new FormControl();
  modelControl = new FormControl()
  file: File;
  csvRecords: any[] = [];

  constructor(private modelService: ModelService, private ngxCsvParser: NgxCsvParser) { }

  ngOnInit(): void {
    this.fileControl.valueChanges.subscribe((file: File) => {
      if (!FileReader) return;

      this.ngxCsvParser.parse(file, { header: false, delimiter: ',' })
      .subscribe((result: Array<any>) => {
        console.log('Result', result);
        this.csvRecords = result;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
    })
  }

}
