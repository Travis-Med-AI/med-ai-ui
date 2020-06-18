import { Component, OnInit, ViewChild } from '@angular/core';
import { JobService } from '../job.service';
import { NgForm, FormArray, FormBuilder, FormControl } from '@angular/forms'
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewJobComponent implements OnInit {
  studies = []
  modelControls: {[id: string]: FormControl} = {}
  models$ = this.jobService.getModels();
  displayedColumns = ['study', 'model', 'submit']
  totalStudies = 0;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private jobService: JobService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fetchStudies(0, 5);
  }

  startEval(study) {
    let model = this.modelControls[study.orthancStudyId].value;
    this.jobService.evalDicom(model, study.id).subscribe(res => alert('successfully started'));
  }

  page(pageEvent: PageEvent) {
    this.fetchStudies(pageEvent.pageIndex, pageEvent.pageSize)
  }

  fetchStudies(pageIndex: number, pageSize: number) {
    this.jobService.getStudies(pageIndex, pageSize).subscribe((studies: {studies: any[], total: number}) => {
      studies.studies.forEach(s => {
        this.modelControls[s.orthancStudyId] = new FormControl('');
      })
      this.totalStudies = studies.total;
      this.studies = studies.studies;
    })
  }

  filterModels(models, study) {
    return models.filter(m => m.input === study.type)
  }

}
