import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobService } from '../job.service';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.scss']
})
export class NewJobComponent implements OnInit {
  studies$ = this.jobService.getStudies();
  models$ = this.jobService.getModels();

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
  }

  startEval(form: NgForm, study: string) {
    let model = form.value.model;
    this.jobService.evalDicom(model, study).subscribe(res => alert('successfully started'))
  }

}
